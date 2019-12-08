import React from 'react';

import './shop-header.css';
import {Link} from "react-router-dom";

const ShopHeader = ({numItem, total}) => {
    return (
        <header className="shop-header row">
            <Link className="logo text-dark" to="/">ReStore</Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart"/>
                    {numItem} items (${total})
                </div>
            </Link>
        </header>
    )
};

export default ShopHeader;