import React from 'react';
import {mapObject, formProps, options} from '../helpers';
import times from 'lodash/times';
import ApiBar from './ApiBar';

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            product: JSON.parse(JSON.stringify(formProps[0]))
        }

        this.onInput = this.onInput.bind(this);
        this.onChange=this.onChange.bind(this);
             
    }

    getProduct() {
        return this.state;
    }

    clear() {
        this.setState({product: JSON.parse(JSON.stringify(formProps[this.state.i]))})
    }

    onChange ({value}) {
        console.log(value);
        this.setState({i: value, product: JSON.parse(JSON.stringify(formProps[value]))});
    }

    onInput(e, i, j) {
        let {name, value} = e.target;
        this.setState((state)=> ({product: {...state.product, [name]: i !== undefined ? [...state.product[name].slice(0, i), j === undefined ? value : !state.product[name][i] ? [value] : [...state.product[name][i].slice(0,j), value, ...state.product[name][i].slice(j+1)] , ...state.product[name].slice(i+1)] : value}}));
    }

    render() {
        console.log(this.state.product);
        return (
            <React.Fragment>
                <ApiBar value={options[this.state.i]} onChange={this.onChange}/>
                    {
                    mapObject(this.state.product, (key, value) =>
                        key === "Images" ? this.state.product["Culori"].map((culoare, i) => 
                            (<Fieldwrap label={`Images (${culoare})`}>
                                {times(value[i] ? value[i].length + 1 : 1, (j) => 
                                    (
                                        <input className="admin-input" type="text"  name={key} value={(value[i] && value[i][j]) || ""} onChange={(e) => this.onInput(e, i, j)} />
                                    )
                                )}
                            </Fieldwrap>
                        )) : (
                            <Fieldwrap label={key}>
                            {!Array.isArray(value) ? (      
                                    <input className="admin-input" type="text"  name={key} value={value} onChange={this.onInput}/>
                                    )
                            : times(value.length + 1, (i) => 
                                    (
                                            <input className="admin-input" type="text"  name={key} value={value[i] || ""} onChange={(e) => this.onInput(e, i)} />
                                    ))
                            
                            }
                            </Fieldwrap>
                            )
                    )}
                        
            </React.Fragment>
)}
}

const Fieldwrap = ({label, children}) => (
    <div className="row">
        <div className="col-4 col-sm-3 col-xl-3 mb-0">
            <label>{label}</label>
        </div>
        <div className="col-8 col-sm-9 col-xl-9 mb-0">
                {children}
        </div>
    </div>
);

export default Api;