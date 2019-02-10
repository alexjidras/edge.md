import React from 'react';
let messages = {ro: "Mulțumim pentru cumpărături", ru: "Благодарим за покупку"};
const Success = ({lang}) => (
    <div className="col-md-12 text-center">
            <img className="emptycart" src="/images/icons/empty-cart-icn.svg"/>
            <p className="noproducts">{messages[lang]}</p>
    </div>
)

export default Success;