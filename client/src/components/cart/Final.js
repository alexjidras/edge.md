import React from 'react';
import isEmpty from 'lodash/isEmpty';
import each from "lodash/each";
import { CartContext } from '../../index';
import { Link } from "react-router-dom";
import { errors, orase} from "../helpers";
import Success from './Success';


class Final extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data : {
                nume: "",
                oras: 0,
                telefon: ""},
            success: false,
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.getError=this.getError.bind(this);
        this.checkout=this.checkout.bind(this);
        }

    handleChange(e) {
        e.persist();
        this.setState((state)=> ({errors: {...state.errors, [e.target.name]: undefined}, data: {...state.data, [e.target.name]: e.target.value}}));
    }

    getError(name) {
        let len = this.state.data[name].length;
        return (name === "nume" && len<3) || (name === "telefon" && len < 6) ? 0 : 1;
    }


    handleSubmit(e, cart, emptyCart) {
        let errors={};
        e.preventDefault();

        each(e.target.elements, (input) => {
            if(!input.checkValidity()) 
            errors[input.name] = this.getError(input.name);  
           
          });

        if (!isEmpty(errors)) {
            let data={};
            for(let key in this.state.data) {
                data[key]= errors[key] !== undefined ? "" : this.state.data[key];
            }
            this.setState({errors, data}, () => console.log(this.state));
            return;
        }
        
        this.setState((state)=> ({success: true, data: {...state.data, products: cart}}), 
        () => fetch('/server/orders', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},  
          credentials: "same-origin",
          body: JSON.stringify(this.state.data)
        }));
        emptyCart(e);
    }

    checkout = (cart) => {
        let comanda=0, livrare = orase.distance[this.state.data.oras];
        cart.forEach((product) => 
        comanda += product.quantity * product.price);
        return {
            comanda,
            livrare,
            total: comanda + livrare
        }
    }



    render() {
        let form_labels = {ro: ["Nume Prenume:", "Telefon:", "Livrare în:", "Comanda", "Livrarea", "Total"], ru: ["Имя Фамилия:", "Телефон:", "Доставить в:", "Заказ", "Доставка", "Итого"]};  
        return !this.state.success ? (
            <div className="col-12 col-sm-12">
                    <CartContext.Consumer>
                    {({cart, handleRemove}) =>{
                            let {comanda, livrare, total} = this.checkout(cart);
                            return  cart.length ? (
                                <form onSubmit={(e)=> this.handleSubmit(e,cart, handleRemove)} noValidate className="row" >
                                    <div className="col-12 col-sm-7 ">
                                        <div className="row-wrap">
                                            {/* <div className="label"> */}
                                                <label htmlFor="nume">{form_labels[this.props.lang][0]}</label>
                                            {/* </div> */}
                                           
                                                <input id="nume" name="nume" value={this.state.data.nume} placeholder={errors[this.props.lang]["nume"][this.state.errors["nume"]] } autoFocus className={this.state.errors["nume"] !== undefined ? "form-input form-invalid" : "form-input"}  type="text" pattern="[^0-9]{3,}" onChange={this.handleChange} onFocus={this.handleChange} required />
                                            
                                            <p className="error">{this.state.errors["nume"] || ""}</p>
                                        </div>

                                    <div className="row-wrap">
                                        {/* <div className="label"> */}
                                        <label htmlFor="telefon">{form_labels[this.props.lang][1]}</label>
                                        {/* </div> */}
                                        
                                        <input id="telefon" name="telefon"placeholder={errors[this.props.lang]["telefon"][this.state.errors["telefon"]] } className={this.state.errors["telefon"] !== undefined ? "form-input form-invalid" : "form-input"}  value={this.state.data.telefon} pattern="[0-9.,\s+-]{6,20}" type="text" onChange={this.handleChange} onFocus={this.handleChange} required/>
                                        <p className="error">{this.state.errors["telefon"] || ""}</p>

                                    </div>

                                    <div className="row-wrap">
                                        <div className="label">
                                        <label htmlFor="oras">{form_labels[this.props.lang][2]}</label>
                                        </div>
                       
                                        <select  value={this.state.data.oras} name="oras" id="oras" className="custom-select oras" onChange={this.handleChange}>
                                            {orase[this.props.lang].map((oras, i)=> <option value={i} key={oras}>{oras}</option>)}
                                        </select>
                                   </div>
                                        
                                    </div>
                                

                                    <div className="col-sm-5">
                                            <div className='out'>
                                                <div className='contain'>
                                                    <div className='filler'></div>
                                                    <span className='lab'>{form_labels[this.props.lang][3]}</span>
                                                    <span className='val'>{comanda} Lei</span>
                                                </div>
                                                
                                                <div className='contain'>
                                                    <div className='filler'></div>
                                                    <span className='lab'>{form_labels[this.props.lang][4]}</span>
                                                    <span className='val'>{livrare} Lei</span>
                                                </div>
                                                <hr className="finalhr"/>
                                                <div className='contain'>
                                                    <div className='filler'></div>
                                                    <span className='lab'>{form_labels[this.props.lang][5]}</span>
                                                    <span className='val'>{total} Lei</span>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <Link to="/cart" className="btn btn-outline-secondary"><i class="fas fa-angle-left"></i>Înapoi</Link>
                                        <button type="submit" className="btn btn-success float-right"><i className="fas fa-check"></i> Finalizează </button>
                                    </div>
                                </form>
                                ) 
                            : null;
                            }
                            }
                            </CartContext.Consumer>          
                 
            </div>
        )
        : <Success lang={this.props.lang}/>
    }
}



export default Final;