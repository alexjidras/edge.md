import React from 'react';

const NoProducts = ({lang}) => {
    const message = {ro: "Nu s-au găsit produse", ru: "Ничего не найдено"}
    return (
        <div className="col-md-12 text-center">
            <i class="far fa-search noproducts-search"></i>
            <p className="noproducts">{message[lang]}</p>
        </div>
    )

}

export default NoProducts;