import React from "react";
import times from 'lodash/times';
import { mapObject, isMobile } from "../helpers";
import RecommendedProducts from './RecommendedProducts';

const Specs = ({lang,products, product, match, width}) => {
    if(!product) return null;
    let keys = Object.keys(product.specs[lang]);
    let j, third=Math.ceil(keys.length/2);
    let icons={'Generale': 'fas fa-clipboard-list', 'Cameră': "fas fa-camera", "Procesor" : "fas fa-microchip", "Baterie": "far fa-battery-three-quarters", "Display": "fas fa-expand", "Memorie": "fas fa-sd-card", "Altele": "fas fa-code-branch",
    'Основные': 'fas fa-clipboard-list', 'Камера': "fas fa-camera", "Процессор" : "fas fa-microchip", "Батарея": "far fa-battery-three-quarters", "Экран": "fas fa-expand", "Память":"fas fa-sd-card", "Дополнительно" : "far fa-dots" },
    //let icons={'Generale': 'edit.svg', 'Cameră': "camera.svg", "Procesor" : "cpu.svg", "Display": "maximize.svg", "Baterie": "battery.svg" },
    specs={ro: "Specificații", ru : "Характеристики"}
   
    return (
        <div className="col-12 col-sm-12">
        <h1 className="specs">{specs[lang]}</h1>
        <div className="row">
        {times(2, (t)=> 
        <div className="col-sm-6">
            <table className="w-100">
                {keys.filter((key, i) => i>=t*third && i< t*third+third ).map((key, i)=> 
                {
                    return (<React.Fragment>
                                <thead><tr className="first"><td>
                                    <i className={icons[key]}></i>
                                    {/* <span className="ispecs" style={{backgroundImage: 'url(/images/' + icons[key] + ')'}}></span> */}
                                    {key}</td></tr></thead>
                                <tbody>
                                    {mapObject(product.specs[lang][key], (spec, value) => {
                                        return value !== "" ? (
                                            <tr >
                                                <td>{spec}</td>
                                                <td>{value}</td>
                                            </tr>) : null
                                    })
                                    }
                                </tbody>
                            </React.Fragment>
                            )
                })
                }
            </table>
        </div>
        )
        }
        <Video video={product.video} width={width} lang={lang}/>
        {isMobile(width) && <RecommendedProducts products={products} product={product}/>}
        </div>
        </div>
      
        
    )
}

const Video = ({video,lang, width}) => {
    let vidos={ro: "Video", ru: "Видео"};
    return video ? (
        <div className="col-12 col-sm-12 ">
        <h1 className = "video">{vidos[lang]}</h1>
        {/* <iframe id="ytplayer" frameBorder="0" allowFullScreen allow=" encrypted-media" width="100%" height="625px" src={video}></iframe> */}
        <video controls width="100%" height="625px"><source src={video} type="video/mp4" /></video>
        </div>
    ) : null;
}

export default Specs;
