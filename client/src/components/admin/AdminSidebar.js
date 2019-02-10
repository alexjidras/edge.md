import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo';

export default (props) => (
    <div className="adminsidebar">
        <Logo/>
        <ul className="links">
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/upload">Upload</Link>
        </ul>
    </div>
)
