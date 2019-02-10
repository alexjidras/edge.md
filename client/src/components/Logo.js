import React from 'react';
import {Link} from "react-router-dom";

const Logo = ({width}) => (
            <Link to="/" className="logo">
              <img  src={"/images/logo.jpg"} alt="logo"/>
            </Link>
);

export default Logo;