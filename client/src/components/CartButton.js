import React from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../index';

const Cart=({lang}) => (
      <div className="d-none d-md-block col-md-4 col-lg-3">
        <div className="cart" >
          <Link  to="/cart" id="cart-label">
            <i className="shop icon"></i>
          </Link>
          <a id="cart-price" >
          <CartContext.Consumer>
          {({cart}) =>{
            let amount=0;
          cart.forEach((product) => 
            amount += product.quantity
          );
          return amount;
          }
        }
        </CartContext.Consumer> 
        
        </a>
        </div>
      </div>
)

export default Cart;