import React from 'react';
import { Route } from "react-router-dom";
import AdminSidebar from './AdminSidebar';
import Products from './Products';
import Action from './Action';
import Upload from './Upload';
import AdminContext from './AdminContext';
import cookie from 'react-cookie';
import Login from './Login';
import LangToggle from '../navbar/LangToggle';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: cookie.load('api_key') || "",
            err: false
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.logout=this.logout.bind(this);
        this.login = this.login.bind(this);
        this.clearErr=this.clearErr.bind(this);
        
    }

    clearErr() {
        this.setState({err:false});
    }

    login(body) {
        fetch("/server/users/login", {method: "POST", body, headers: {"Content-Type": "application/json"}}).then((res)=> 
            res.ok ? res.json() : Promise.reject(res.text)).then(({username, api_key}) => this.setState({username, api_key, err: false})).catch((e)=> 
                this.setState({err: true}));
    }
    
    logout() {
        fetch("/server/users/logout", {method: "POST", headers: {"Content-Type": "application/json", "X-API-KEY": this.state.api_key}}).then(() => this.setState({api_key: ""}))
    }

    deleteProduct(id) {
           fetch(`/server/api/${id}`, {method: "delete", headers: {"Content-Type": "application/json", "X-API-KEY": this.state.api_key}}).then((res) => 
               res.status === 200 ? this.props.updateProducts(this.props.products.filter((p) => p.id !== id)) : res.text().then((text) => console.log(`${res.status} ${text}`)))
    }
     
    render() {
        return this.state.api_key ?
            <div className="container-fluid">               
                <div className="d-flex">
                    <AdminContext.Provider value={{deleteProduct: this.deleteProduct}}>                       
                        <AdminSidebar/>
                            <div className="admin-content">
                                <div className="admin-bar"><a href="javascript:void" className="logout"  onClick={this.logout}>Logout</a><LangToggle/></div>                    
                                <Route path="/admin/products" exact render={(props)=> <Products {...props} products={this.props.products} lang={this.props.lang} width={this.props.width} />} />
                                <Route path="/admin/products/:action(new|edit)" render={(props)=> <Action {...props}  updateProducts={this.props.updateProducts}  onLogout={this.logout} products={this.props.products} api_key={this.state.api_key} lang={this.props.lang} width={this.props.width} />} />
                                {/* <Route path="/admin/orders" render={(props)=> <Orders {...props} products={this.props.products} lang={this.props.lang} width={this.props.width} />} /> */}
                                <Route path="/admin/upload" render={(props)=> <Upload {...props} lang={this.props.lang} width={this.props.width} api_key={this.state.api_key}/>} />
                            </div>
                    </AdminContext.Provider>
                </div>
            </div>
        : <Login onLogin={this.login} err={this.state.err} clearErr={this.clearErr}/>    
    }
}

export default Admin;