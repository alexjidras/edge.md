import React from 'react';

const Options = ({lang, warranty}) => {
    const icons=["far fa-clock", "fas fa-award", "fas fa-undo"], 
    options= {ro: ["Livrare gratuită în Chișinău în 2 ore.", warranty + " ani de suport tehnic gratuit.", "Posibilitatea de a returna/schimba produsul în 30 zile."],
    ru: ["Бесплатная доставка по Кишинёву за 2 часа.", warranty + " лет бесплатной техподержки", "Возврат или обмен товара в течение 30 дней." ]};   

    return (
            <ul className="option_advantages d-none d-md-block">
                {options[lang].map((option, i)=> <li><i className={icons[i]} key={i}></i>{option}</li>)}
            </ul>
    ) 
}

export default Options;