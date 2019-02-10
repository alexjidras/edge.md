import React from 'react';
import {Link, Route} from "react-router-dom";
import { side, links } from "./helpers";
import {ThemeContext} from '../index.js';
import Logo from './Logo';

class Sidebar extends React.Component {
  toggleDropdown() {
   this.dropdown.classList.toggle('notransition');
   this.dropdown.style.height = this.dropdown.style.height === "175px" ? "0px" : "175px";
  }
  componentWillReceiveProps(newProps) {
    if(this.props.lang !== newProps.lang) return;
    this.dropdown.classList.add('notransition');
    this.dropdown.style.height = "0px";
  }

  render() {
    return (
        <div className='sidebar menu '>
          <i class="fas fa-bars d-block d-md-none" onClick={this.toggleDropdown.bind(this)}></i>
          <Logo width={this.props.width}/>
          <Link to={"/cart"}> <i className="shop icon shop-mobile d-block d-md-none" ></i></Link>

          <div className="dropdown d-block d-md-none text-center notransition" ref={(ref)=> this.dropdown = ref}>

          <ul className="ul-dropdown">
              <li className="telefon">+373 068013670</li>
              {/* <li><Link to={"/cart"}> <i className="shop icon d-block d-sm-none "></i></Link></li> */}
              <ThemeContext.Consumer>
              {({lang, toggleLang})=> (
              <li className="lang-menu" onClick={toggleLang}><b>{lang === "ro" ? "RU" : "RO"}</b></li>
              )}
              </ThemeContext.Consumer>
          </ul>

            <ul className='sidemenu' onClick={this.toggleDropdown.bind(this)} >
              {side[this.props.lang].map((label, i)=> <MyLink to={links[i+3]} label={label} key={i}/>)}
            </ul>
            
          </div>

          <ul className='sidemenu d-none d-md-block' >
              {side[this.props.lang].map((label, i)=> <MyLink to={links[i+3]} label={label} key={i}/>)}
            </ul>
            
        </div>
    
    )
  }
}

const MyLink = ({ label, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <li className={match ? "sidelink selected " : "sidelink"}>
        <Link to={to}>{label}</Link>
      </li>
    )}
  />
);



export default Sidebar;