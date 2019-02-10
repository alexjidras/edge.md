import React from 'react';
import {ThemeContext} from '../../index';
import './toggler.css';

const LangToggle= (props) => {
    return (
        <ThemeContext.Consumer>
        {({lang, toggleLang})=> (
            <label className="switch mb-0">
                <input type="checkbox" checked={lang==='ro'} onChange={toggleLang}/>               
                <span className="lang-slider round">
                <span className="lang-span" style={{left: lang === 'ro' ? "13px" : "-22px"}}>
                <span className="lang-first" style={{opacity: lang === "ro" ? 1 : 0}} >RO</span>
                <span style={{opacity: lang === "ro" ? 0 : 1}}>RU</span>
                </span>
                </span>
            </label>
        )}
        </ThemeContext.Consumer>
    )
}

export default LangToggle;