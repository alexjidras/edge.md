import React from 'react';
let message = {ro: "Coșul este gol", ru: "Корзина пуста"};

const EmptyCart = ({lang}) => (
    <div className="col-md-12 text-center">
            <img className="emptycart" src="/images/icons/empty-cart-icn.svg"/>
            <p className="noproducts">{message[lang]}</p>
    </div>
);

export default EmptyCart;