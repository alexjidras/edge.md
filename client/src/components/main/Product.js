import React from "react";
import { Route, Link } from "react-router-dom";
import { CartContext } from '../../index';
import {valuta} from "../helpers";
//import LazyLoad from 'react-lazyload';
import AdminContext from '../admin/AdminContext';

const Product=({product, lang, hot}) => (
    <div className="card">
    <Route path="/admin/products" render={(props) => (
            <AdminContext.Consumer>
              {({deleteProduct}) => (
                <div className="admin-icons">
                  <Link className="edit-icon" to={`/admin/products/edit/${product.id}`}><i class="far fa-pen"></i></Link>
                  <i onClick={() => deleteProduct(product.id)} class="far fa-times del-icon"></i>
                </div>
              )}
            </AdminContext.Consumer>)
          } />
    <div className="triangle-topright">
    {!hot ? null : product.hottness >= 80 ? <i class="fab fa-hotjar"></i> : null}
    </div>
    
    <Link  to={"/" + product.id}>
    <h4 className="card-title">{product.name}</h4>
      <div className="card-img-wrapper">
      {/* <LazyLoad height={"250"} offset={"500"}> */}
      <img className="card-img-top" src={`/images/resize/medium/${product.thumbnail}`} />
      {/* </LazyLoad> */}
      </div>
      </Link>
      <div className="card-body">
        <div className="productinfo">
          <CardColors colors={product.colors}/>
          <CardMemory memories={product.filter[lang][lang === "ro" ? "Memorie" : "Память"]}/>
          <h2 className="card-price">{product.price[0]+" "}<span>{valuta[lang]}</span></h2>
          {/* <DetailsButton id={product.id} /> */}   
          <AddButton product={product}/>
          
        </div>
      </div>
      
    </div>
  );

  
const AddButton = ({product}) => {
  
  return (
    <CartContext.Consumer>
        {({handleAdd}) => 
        <i className="add-to-cart" onClick={(e)=>{handleAdd({id: product.id, memory: 0, color: 0, quantity: 1, price: product.price[0]})}} >
          
        </i>
        }
        </CartContext.Consumer>
  )
}

const CardMemory = (props) => {
  let memories="";
  if (props.memories) {
    props.memories.forEach((mem, i,arr)=> {
    i !== arr.length-1 ? memories+=mem.slice(0,-3) +" / " : memories+=mem;
  });
  return (
    <p className="card-memory">{memories}</p>
  )
} 
return null;
}

const CardColors = (props)=> {
  return (
    <div className="card-colors">
    {props.colors.map((color, i)=> <button className="card-color" key={i}><span style={{background: color}}></span></button>)}
      
    </div>
  )
}

export default Product;