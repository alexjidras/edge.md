import React from 'react';
// import { Link, NavLink, Route} from "react-router-dom";
// import {ThemeContext} from '../../index';
// import DayNight from './DayNight';
import LangToggle from './LangToggle';
import { nav, links } from "../helpers";
import TopLink from './TopLink';

const Navbar = ({lang}) => {
    return (
      <div className="d-none d-md-block col-md-12 mb-0">
        <ul className="topbar ">
        {nav[lang].map((label, i)=> <TopLink to={links[i]} key={i} exact={i === 0} label={label} />)}
            
            <li className="toplink ">
            <LangToggle/>
            </li>
            {/* <li className="toplink float-right daynight"> 
            <DayNightButton/>
            </li>
    */}
            <li className="toplink  d-md-none d-lg-block">
            <p className="telefon">+373 061041697</p>
            </li>
        </ul>
      </div> 
    )
}



// const DayNightButton=(props) => {
//   return (
//     <ThemeContext.Consumer>
//       {({theme, toggleTheme}) => (
//         <span
//           {...props} onClick={toggleTheme}
//         />
//       )}
//     </ThemeContext.Consumer>
//   );
// }

export default Navbar;