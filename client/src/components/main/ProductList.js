import React from 'react';
import Product from "./Product";
import Paginator from './Paginator';
import { isTablet } from "../helpers";


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            size: this.props.products.length,
            current: props.location.state ? props.location.state.page : 1
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({size: nextProps.products.length, current: nextProps.location.state ? nextProps.location.state.page : 1});
    }

    render() {
        let pageproducts=[], start =(this.state.current-1)*24, end = this.state.current*24< this.state.size ? this.state.current*24 : this.state.size, perrow= !isTablet(this.props.width) ? 3 : 2, rows = Math.ceil((end-start)/perrow);
        for( let i= 0; i<rows; i++) {
            pageproducts.push(<div className="row grid">
            {this.props.products.slice(start + i * perrow, start + (i+1) * perrow).map((product) =><div className="col-6 col-lg-4"><Product lang={this.props.lang} product={product} hot={this.props.hot}/></div>)}
            </div>)
        }

    return (
        <div className="col-12">
            {pageproducts}   
            <Paginator size={this.state.size} current={this.state.current} location={this.props.location} />
        </div>)
    }
}

export default ProductList;