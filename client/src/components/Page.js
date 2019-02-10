import React from 'react';
import { Switch, Route } from "react-router-dom";
import ProductsInterface from './main/ProductInterface';
import Sidebar from './Sidebar';
import Navbar from './navbar/Navbar';
import CartButton from './CartButton';
import ProductPage from './product/ProductPage';
import CartPage from './cart/CartPage';
import RecommendedProducts from './product/RecommendedProducts';
import Specs from "./product/Specs";
import Final from './cart/Final';
import Filter from "./main/Filter";
import Searchbar from './Searchbar';
import NotFound from './NotFound';
import Contacte from './Contacte';
import Livrare from './Livrare';
import { search, isMobile } from './helpers';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import {Helmet as Head} from "react-helmet";
import Footer from './Footer.js';


class Page extends React.Component {
    constructor(props) {
      super(props);
      this.getProducts=this.getProducts.bind(this);
      this.state={search: "", products: this.getProducts(), filter: {}, price:{} };
      this.inputRef = React.createRef();
      this.filterRef = React.createRef();
      this.onReceiveFilter=this.onReceiveFilter.bind(this);
      this.filter=this.filter.bind(this);
      this.changePrice=this.changePrice.bind(this);
      this.toggleFilter=this.toggleFilter.bind(this);
      this.search=debounce(this.search.bind(this), 150);

    }
  
    componentWillReceiveProps(nextProps) {
      if(this.props.width !== nextProps.width) return;
      if(this.props.lang !== nextProps.lang) return this.setState({filter: {}, price: {}}); 
        
        if(!nextProps.location.state) {
          this.inputRef.current.clear();
          return this.setState({search:"", products: this.getProducts(nextProps), filter: {}, price: {}});
        }
        else {
          if(nextProps.location.state.search) {            
            this.inputRef.current.setVal(nextProps.location.state.search);
            this.inputRef.current.toggleLoading();
            this.setState({products: search(nextProps.location.state.search, nextProps),  search: nextProps.location.state.search, filter: nextProps.location.state.filter || {}, price: {}}, ()=> this.inputRef.current.toggleLoading());
          }
          else {
            this.inputRef.current.clear();
            return this.setState({search:"", products: this.getProducts(nextProps), filter: nextProps.location.state.filter || {}, price: {}});
          }
        }
      
  }
  
   onReceiveFilter(ev) {
    let filter={...this.state.filter};
    let {name, value, checked}= ev.target;
    if(+value || value==="0") value=+value;
    if(checked) {
        if(!filter[name]) filter[name]=[value];
        else filter[name].push(value); 
    }
    else filter[name].length>1 ? filter[name].splice(filter[name].indexOf(value), 1) : delete filter[name];
    this.setState({filter}); 
    this.props.history[!this.props.location.state || this.props.location.state.filter === undefined && this.props.location.state.search === undefined ? 'push' : "replace"](this.props.location.pathname, {page: 1, filter, search: this.props.location.state && this.props.location.state.search });
    
  }
  
  
  changePrice(price) {
    this.setState({price}, ()=> console.log(this.state.price));
  }
  
  toggleFilter() {
    this.filterRef.current.toggleOpen();
  }
  
   search(search, props=this.props) {
    props.history[!props.location.state || props.location.state.search === undefined && props.location.state.filter === undefined ? 'push' : "replace" ](props.location.pathname, {page: 1, search});
    
   }
  
   getProducts(props=this.props) {
    let products=[];
    let path = props.location.pathname.replace(/\//g, "");
    if(["", "smartphoane", "ceasuri", "tablete", "accesorii"].includes(path)) 
    products = props.products.filter((product)=> path ? product.cattegory === path : 1)
    return products;
  }
  
  
  
  filter(found) {
    return (!isEmpty(this.state.filter) || !isEmpty(this.state.price)) ? found.filter((product) =>{
      for (let x in this.state.filter) 
          if(!product.filter[this.props.lang][x] || !this.state.filter[x].some((el)=> product.filter[this.props.lang][x].indexOf(el)!=-1)) return false;
      return product.price.some((price) => (this.state.price.max ? price<=this.state.price.max : true) && (this.state.price.min ? price>=this.state.price.min : true));
    }) : found;
  
  }
  
  render() {
    console.log(this.props.location, this.state);
      return (
            <div className="container">
            <Head>                
                <title>Edge - magazin online de telefoane, tablete, ceasuri și accesorii</title>
                <meta name="description" content="Magazin online. Telefoane mobile, Smartphoane, Tablete, Ceasuri"></meta>
                <meta name="keywords" content="telefoane mobile, smartphoane, telefon mobil, telefoane mobile ieftine, telefoane ieftine, telefoane mobile chisinau, telefoane mobile md, telefoane de vanzare"></meta>
            </Head>
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3 side " >
                  <Sidebar lang={this.props.lang} width={this.props.width}/>
                  <Filter lang={this.props.lang} products={this.state.products} filter={this.state.filter} onFilter={this.onReceiveFilter} price={this.state.price} changePrice={this.changePrice} width={this.props.width} ref={this.filterRef}/>
                  {!isMobile(this.props.width) && !this.state.search && <Route  path="/:id(\d+)" render={(props)=> <RecommendedProducts {...props} products={this.props.products}/>} />}
                </div>
              <div className="col-12 col-md-8 col-lg-9 mb-0">
                <div className="row">
                  <Navbar lang={this.props.lang}/>
                  <Searchbar onChange={(e) => this.search(e.target.value)} ref={this.inputRef} lang={this.props.lang}/>              
                  <CartButton lang={this.props.lang}/>
                  {this.state.search ?       
                    <ProductsInterface location = {this.props.location} lang={this.props.lang} products={this.filter(this.state.products)} toggleFilter={this.toggleFilter} width={this.props.width} />   
                  : (
                    <Switch>
                      <Route
                                path="*(/|/smartphoane|/ceasuri|/accesorii|/tablete)"
                                exact
                                render={(props) => <ProductsInterface {...props} lang={this.props.lang} products={this.filter(this.state.products)} toggleFilter={this.toggleFilter} width={this.props.width}/>}
                              />
                      <Route
                              path="/:id(\d+)"
                              render={(props) => <ProductPage {...props} lang={this.props.lang} product={this.props.products.find((product)=> product.id === +props.match.params.id)} width={this.props.width}/>}
                      />
                      <Route
                              path="/cart"
                              render={(props) => <CartPage lang={this.props.lang} products={this.props.products} width={this.props.width} {...props}/>}
                      />
                      <Route
                                path="/final"
                                render={() => <Final lang={this.props.lang}/>}
                              />
                      <Route
                              path="/livrare"
                              render={() => <Livrare lang={this.props.lang}/>}
                      />
                      <Route
                              path="/contacte"
                              component={Contacte}
                      />
                      <Route render={(props) => <NotFound {...props} lang={this.props.lang}/>} />
                    </Switch>
                    )
                      }
                  </div>
                </div>
                {!this.state.search &&
                  <Route path="/:id(\d+)" render={(props) => <Specs {...props} lang={this.props.lang} product={this.props.products.find((product)=> product.id === +props.match.params.id)} products={this.props.products} width={this.props.width}/>}/>
                }
                
              </div>
              <Footer search = {this.state.search}/>
            </div>
            );
  }     
  }

  export default Page;