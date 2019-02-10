import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import parallel from 'async/parallel';
import inRange from 'lodash/inRange';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollTop from './components/Scroll';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import Page from './components/Page';
import { themes } from './components/helpers';
import Admin from './components/admin/Admin.js';


export const ThemeContext = React.createContext({
  theme: themes.dark, 
  toggleTheme: ()=> {},
  lang: 'ro',
  toggleLang: () => {}
});

export const CartContext = React.createContext({
  cart :[],
  handleRemove: ()=> {},
  handleChange: () => {},
  handleAdd : ()=> {},
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }), 
      ()=> document.body.style="background-color:" + this.state.theme.background);
    };

    this.toggleLang = () => {
      this.setState((state)=> ({lang: state.lang==='ro' ? 'ru' : 'ro'}), ()=> cookie.save('lang', this.state.lang));
    }
    this.handleRemove = (e, target) => {
      this.setState(({cart})=> ({cart: target ? cart.filter((product)=> product.id !== target.id || product.color !== target.color || product.memory !== target.memory) : []}), () => this.updateSession());
    }
    this.updateSession=() => {
      fetch("/server/cart", {method: "POST", body: JSON.stringify(this.state.cart), headers: {"Content-Type": "application/json"}, credentials: "same-origin"});
    }

    this.handleAdd = (product) => {
      let products=[];
      this.setState((state)=> {
        let s=state;
          for(let i = 0; i < s.cart.length; i++)
              if (s.cart[i].id ===  product.id)
                  products.push(i);
        if(products.length !== 0) {
            for(let i=0; i<products.length; i++) {
                if(product.color === s.cart[products[i]].color && product.memory === s.cart[products[i]].memory) {
                  if(s.cart[products[i]].quantity<10) s.cart[products[i]].quantity += product.quantity;
                    return s;
                }
            }
           
        }
        s.cart.push(product);
        return s;
      }, () => this.updateSession());         
    }

    this.handleChange=(e, product) => {
      e.persist();
      let products=[], {name, value} = e.target;
      if(name === 'quantity' && (value<1 || value>10)) return;
      for(let i = 0; i < this.state.cart.length; i++)
          if (this.state.cart[i].id ===  product.id)
              products.push(i);
      for(let i=0; i<products.length; i++) {
          if(product.color === this.state.cart[products[i]].color && product.memory === this.state.cart[products[i]].memory) {
              this.setState((state) => {
                let s=state;
                s.cart[products[i]][name] = +value;
                return s;
                }, ()=> this.updateSession());
                break;
          }
      }
    }

    this.updateProducts = (products) => {
      this.setState({products}, () => console.log(this.state.products));
    }

    
    this.state = {
      theme: inRange(new Date().getHours(), 4, 21) ? themes.light : themes.dark,
      toggleTheme: this.toggleTheme,
      lang: cookie.load('lang') || 'ro',
      toggleLang: this.toggleLang,
      products: {},
      cart: [],
      handleChange : this.handleChange,
      handleRemove : this.handleRemove,
      handleAdd: this.handleAdd,
      width: window.innerWidth
    };
  }


  componentDidMount () {
    console.time('A');
    parallel({
      products: (callback)=> {
           fetch("/server/api").then((res)=>res.json()).then((products)=> callback(null, products));     
      },
      cart: (callback)=> {
        fetch('/server/cart', {credentials: "same-origin"}).then((res)=>res.json()).then((cartProducts)=> callback(null, cartProducts));
      }
  }, (err, results)=> {
    
      this.setState(results, ()=> console.timeEnd('A'));
  });
  window.addEventListener('resize', this.handleWindowSizeChange);               
}

handleWindowSizeChange = () => {
  this.state.width !== window.innerWidth && this.setState({ width: window.innerWidth });
};

render() {
   return (
  isEmpty(this.state.products) ? null 
  :
  (<Router>
    <ThemeContext.Provider value={pick(this.state, ['lang', 'toggleLang', 'toggleTheme', 'theme'])}>
      <CartContext.Provider value={pick(this.state, ['cart', 'handleChange', 'handleRemove', 'handleAdd'])}>
      <Switch>
          <Route path="/admin" render={(props)=> <Admin {...props} products={this.state.products} updateProducts={this.updateProducts} lang={this.state.lang} width={this.state.width} />} />
          <Route
            path="*"
            render={(props)=> (
              <ScrollTop location={props.location}>
                <Page {...props} products={this.state.products} lang={this.state.lang} width={this.state.width}/>
              </ScrollTop>
            )}
          />
          </Switch>
      </CartContext.Provider>
    </ThemeContext.Provider>
  </Router>)
  )
}
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();