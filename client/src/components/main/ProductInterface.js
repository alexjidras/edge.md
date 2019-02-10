import React from 'react';
import cookie from 'react-cookie';
import ProductList from './ProductList';
import NoProducts from './NoProducts';

class ProductsInterface extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            hot: cookie.load('hot') === undefined ? 1 : +cookie.load('hot'),
            sort : +cookie.load('sort') || 1    
        }

        this.toggleHot=this.toggleHot.bind(this);
        this.handleChange=this.handleChange.bind(this);
        
    }

    toggleHot = () =>  {
        this.setState(prevState => ({
            hot: Number(!prevState.hot)
        }), ()=> cookie.save('hot', this.state.hot));  
    }

    handleChange(event) {
        this.setState({sort: +event.target.value}, ()=> cookie.save('sort', this.state.sort));
    }

    render() {
        let sorted=[...this.props.products];
        let sort_values = {ro: ["Populare", "Mai ieftin", "Mai scump"], ru: ["Популярные", "Подешевле", "Подороже"]};
        switch(this.state.sort) {
            case 1 : this.state.hot ? sorted.sort((a,b)=>  (b.popularity + b.hottness) - (a.popularity + a.hottness)) : sorted.sort((a,b)=> b.popularity - a.popularity);break;
            case 2 : sorted.sort((a,b)=> a.price[0]-b.price[0]);break; 
            case 3 : sorted.sort((a,b)=> b.price[0] -a.price[0]);break;
           
        }
        return (
            <div className="col-12 product-interface">
                <div className="row">
                {sorted.length ? [ 
                    <div className="col-12">
                        <SortSelect value={this.state.sort} values={sort_values[this.props.lang]} handleChange={this.handleChange}/>                  
                        <HotButton hot={this.state.hot} onToggle={this.toggleHot}/>                   
                        {/* <i class="fas fa-filter d-inline-block d-md-none text-right" onClick={this.props.toggleFilter}></i>                    */}
                        <span class="d-inline-block d-md-none text-right togglefilter-mobile" onClick={this.props.toggleFilter}>Filtru</span>
                    </div>, 
                        
                    <ProductList lang={this.props.lang} location = {this.props.location} products={sorted} width={this.props.width} hot={this.state.hot}/>
                    
                ]
                        : <NoProducts lang={this.props.lang}/> 
                        }                   
                </div>
            </div>
        );     
    }
}

  

const HotButton = ({hot, onToggle}) => (
    <button className={hot ? "btn btn-danger" : "btn btn-outline-danger"} onClick={onToggle}>Hot</button>
    
);

const SortSelect = ({value, values, handleChange}) => (
    <select className="custom-select sort" value={value} onChange={handleChange}>
        {values.map((v,i)=> <option value={i+1} key={i}>{v}</option>)}
    </select>
);


export default ProductsInterface;
