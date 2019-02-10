import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { CartContext } from '../../index';
import {  Link} from "react-router-dom";
import {colorkey, memorykey, valuta, isDesktop} from "../helpers";
import EmptyCart from './EmptyCart';


class CartPage extends React.Component {

  render() {
    let cos={ro: "COS", ru: "Корзина"}, labels = {ro: ["DESCRIERE", "CANTITATE", "PRET"], ru: ["ОПИСАНИЕ", "КОЛИЧЕСТВО", "ЦЕНА"]};
    return (
      <div className="col-12">
      <CartContext.Consumer>
          {({cart, handleChange, handleRemove}) => cart.length ? (
            <React.Fragment>
              <div className="col-12">
              {isDesktop(this.props.width) ? (
              <div className="row item">
              <div className="col-6 text-left" style={{paddingLeft:'0'}}>
                {labels[this.props.lang][0]}
              </div>
              
              <div className="col-3">
              {labels[this.props.lang][1]}
              </div>
              <div className="col-2">
              {labels[this.props.lang][2]}
              </div>
              <div className="col-1">
              </div>
              
              
                {/* <h4>{cos[this.props.lang]}</h4> */}
              </div>)
              : (<div className="row item">
                <p>{cos[this.props.lang]}</p>
              </div>)
              }
                  {cart.map((product, i)=> {
                    let original = this.props.products.find((prod) => prod.id === product.id);
                    if(!original) return handleRemove(null, product);
                  return <CartProduct product={{...original, ...product}} lang={this.props.lang} onRemove={handleRemove} onChange={handleChange} key={i} />
                })}
              </div>
              <a href={"javascript:void"} className="btn btn-outline-secondary" onClick={this.props.history.goBack}><i class="fas fa-angle-left"></i>Înapoi</a>
              <Link to="/final" className="btn btn-outline-primary float-right">Continuă<i class="fas fa-angle-right"></i></Link>
      </React.Fragment>
          ) : <EmptyCart lang={this.props.lang}/>
          }
        </CartContext.Consumer>
      </div>
    )
  }
}

const CartProduct =({product, lang, onRemove, onChange}) => {
  return (
      <div className="row item">
       <i className="fal fa-times del-icon d-lg-none" onClick={(e) => onRemove(e, product)}></i>
        <div className="col-12 col-lg-6">
          <div className="row" style={{flexWrap:  'nowrap'}}>
            <div className="cart-thumbnail">
              <img className="card-img-top  img-cart" src={`/images/resize/small/${product.images[product.color][0]}`} />
            </div>
            <div className="description">
              <Link to={`/${product.id}`} className="product-name">{`${product.name}`}</Link>
              <select className="custom-select first-select" value={product.color} name="color" onChange={(e)=> onChange(e, product)}>
              
              {product.filter[lang][colorkey[lang]].map((color,i)=> <option value={i} key={i}>{color}</option>)}
            </select>
            {product.cattegory === "smartphoane" && product.filter[lang][memorykey[lang]] &&
                <select className="custom-select sec-select" value={product.memory} name="memory" onChange={(e)=> onChange(e, product)}>
                    {product.filter[lang][memorykey[lang]].map((mem,i)=> <option value={i} key={i}>{mem}</option>)}
                </select> 
            } 
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3 quantity">
          <button className="plus-btn" type="button" name="quantity" value={product.quantity+1} onClick={(e)=> onChange(e, product)}>
            <img src="/images/icons/plus.svg" />
          </button>
          <input type="text" name="quantity" value={product.quantity} className="quantity" onChange={(e) => onChange(e, product)}/>
          <button className="minus-btn" type="button" name="quantity" value={product.quantity-1} onClick={(e)=> onChange(e, product)}>
            <img src="/images/icons/minus.svg"  />
          </button>
        </div>
  
        <div className="col-6 col-lg-2 cart-price"><p>{`${product.price * product.quantity} ${valuta[lang]}`}</p></div>
        <div className="d-none d-lg-block col-lg-1"><span className="delete-btn" style={{position: 'relative', top: 'calc(50% - 18px)'}} onClick={(e) => onRemove(e, product)}></span></div>
    </div>
  )
}

export default CartPage;