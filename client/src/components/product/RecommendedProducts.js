import React from 'react';
import { Link } from "react-router-dom";

const Recommended = (props) => {
    const getRecommended = () => {
        let found = props.product || props.products.find((product)=> product.id === +props.match.params.id);
        if(!found) return [];
        let potential = props.products.filter((product)=> product.cattegory === found.cattegory && Math.abs(product.price[0] - found.price[0]) < 3000 && product.id !== found.id);
        potential.forEach((product,i)=> {
            potential[i].stack = 0;
            for (let x in product.filter['ro']) {
                if (product.filter['ro'][x].some((val) => found.filter['ro'][x] && found.filter['ro'][x].includes(val))) potential[i].stack++;  
            }
        });
        return potential.sort((a,b)=> b.stack - a.stack).slice(0,2);
    }

    let recommended = getRecommended();
    return recommended.length > 1 ? (
    <div className="sidebar recomandari">
    <h4 className="recommended-header">Similare</h4>

        {recommended.map((product) => (
        <div className="recommended">
            <div >
            {/* <div className="product-img-main" style={{backgroundImage: 'url(/images/' + product.images[0] + ')'}}></div> */}
                <img className="img-recommended" src={`/images/resize/small/${product.thumbnail}`}/>
            </div>
            <div className="recommended-right">
                <Link to={`/${product.id}`} className="recommended-link">{product.name}</Link>
                {/* <h6>{product.price[0]} <span className="recommended-span"> lei</span></h6> */}
            </div>
        </div>
        ))}
    </div>
    ) : null;
};

export default Recommended;
