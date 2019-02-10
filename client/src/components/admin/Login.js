import React from 'react';
import './css/login.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""

        }
        this.onChange=this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.err) this.setState({username:"", password: ""});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="container-login">
                <div className="main-login">
                    <div className="title-box">
                        Log In
                    </div>                  
                    <input name="username" type="text" placeholder="username" className={"login-input " + (this.props.err ? "input-invalid" : "")} value={this.state.username} onChange={this.onChange} onFocus={this.props.clearErr} autoComplete={'off'} required/>
                    <input name="password" type="password" placeholder="password" className={"login-input " + (this.props.err ? "input-invalid" : "")} value={this.state.password} onChange={this.onChange} onFocus={this.props.clearErr} autoComplete={'off'} onKeyDown={(e)=> e.keyCode === 13 && this.props.onLogin(JSON.stringify(this.state))} required/>
                    <button className="btn-primary login-submit" onClick={()=> this.props.onLogin(JSON.stringify(this.state))}>Log in</button>
	    	
                </div>		
            </div>
           
        )
    }
    
}

export default Login;