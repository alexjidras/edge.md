import React from 'react';
import { Link} from "react-router-dom";
import debounce from 'lodash/debounce';
import ProductsInterface from '../main/ProductInterface';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            products: props.products
        }
        this.onSearch=debounce(this.onSearch.bind(this), 50);

    }

    componentWillReceiveProps(newProps) {
        this.setState({products: newProps.products})
    }

   

    onSearch(search) {
        let x = search.match(/\w+/g);
        let found = !search ? this.props.products : x ? this.props.products.filter(
          (y)=> x.every(
            (ex) => new RegExp(ex.length === 1 ? "\\b"+ ex : ex, "i").test(y.keywords))) : [];
        this.setState({products: found,  search});
       }
    
    render () {
        return (
        <React.Fragment>
            <div className="products-top">
                <Link to={"/admin/products/new"} className="new">New</Link>
                <input className="admin-search" onChange={(e) => this.onSearch(e.target.value)}/>
            </div >
            <div className="piwrap">
                <ProductsInterface {...this.props} products={this.state.products}/>
            </div>
                {/* {this.state.products.map((product) => (
                    <div className="prod-row">{product.name}</div>
                ))} */}
        </React.Fragment>
           
        )
    }
}

export default Products;