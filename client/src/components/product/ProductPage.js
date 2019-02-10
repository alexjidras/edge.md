import React from 'react';
import {Link, Route } from "react-router-dom";
import { CartContext } from '../../index';
import Description from "./Description";
import {valuta, memorykey, isMobile, isTablet, preload} from "../helpers";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import ProductCarousel from "./ProductCarousel";
import NotFound from '../NotFound';
import Minicarousel from './Minicarousel';
import {Helmet as Head} from "react-helmet";


class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={color: 0, memory: 0, image: 0};
    this.change=this.change.bind(this);
    this.onImageClick=this.onImageClick.bind(this);
  }
  
  componentWillReceiveProps(next) {
    if(JSON.stringify(next.product) !== JSON.stringify(this.props.product)) {
      this.setState({image: 0, memory: 0, color: 0});
      preload(next.product.images);
    }
  }

  componentDidMount() {
    this.props.product && preload(this.props.product.images);
  }

  change(e) {
    this.setState({[e.target.name]: +e.target.value, image: e.target.name === 'color' ? 0 : this.state.image});
  }

  onImageClick(i) {
    this.setState({image: i});
  }
 

  render() {
    const keywords = ["", "pret", "md", "pret moldova", "pret md"],
    adauga ={ro: "Adaugă", ru: "Добавить"}, cumpara={ro: "Cumpără", ru: "Купить"};
  return this.props.product ? (
    <div className="col-12 mb-0">
      <Head>                
        <title>{this.props.product.name}</title>
        <meta name="description" content={`Cumpără Acum ${this.props.product.name} La Cel Mai Bun Preț`}></meta>
        <meta name="keywords" content={keywords.map((k) => `${this.props.product.name} ${k}`).join(",")}></meta>
      </Head>
      <div className="row">
        <div className="col-12 col-sm-12 col-xl-5 img-div">
          <ProductCarousel images={this.props.product.images[this.state.color]} goTo={this.state.image} onImageChange={this.onImageClick} width={this.props.width}/>
        </div>

        <div className="col-12 col-sm-12 col-xl-7 details-container">
          {/* <div className="details-container"> */}
            <h1>{this.props.product.name}</h1>
            <h2 className="product-price">{this.props.product.price[this.state.memory] + valuta[this.props.lang]}</h2>

            <div className="row  d-md-flex">
              <ColorChange lang={this.props.lang} product={this.props.product} color={this.state.color} onChange={this.change} width={this.props.width}/>
              <MemoryChange lang={this.props.lang} product={this.props.product} memory={this.state.memory} onChange={this.change}/>
              
            </div>
            <Minicarousel images={this.props.product.images[this.state.color]} i={this.state.image} color={this.state.color} onImageClick={this.onImageClick} width={this.props.width}/>
            <div >       
            <Description lang={this.props.lang} warranty={this.props.product.warranty}/>
            <div className="row">
            <CartContext.Consumer>
              {({handleAdd}) => [
              <div className="col-6 col-md-5" key={0}>
                <Link className=" cumpar_btn" to="/cart" onClick={(e)=> handleAdd({id: this.props.product.id, color: this.state.color, memory: this.state.memory, quantity: 1, price: this.props.product.price[this.state.memory]})}>{cumpara[this.props.lang]}</Link>
              </div>,
              <div className="col-6 col-md-5 " key={1}>
                <a href="javascript:void" className="add_btn" onClick={(e)=> handleAdd({id: this.props.product.id, color: this.state.color, memory: this.state.memory, quantity: 1, price: this.props.product.price[this.state.memory]})}>{adauga[this.props.lang]}</a>
              </div>] 
              }
              </CartContext.Consumer>
            </div>
           </div> 
          {/* </div> */}
        </div>
                            
      </div>
   </div>
  ) : <Route render={(props) => <NotFound {...props} lang={this.props.lang}/>} />
  }
}

const ColorChange = ({product, color, lang, onChange, width}) => {
  let culoare = {ro: "Culoare :", ru: "Цвет :"};
  return (
    <div className={`col-7 col-md-${product.colors.length + 2} ${!isTablet(width) && "nowrap"} color-div`} >
      <h4 style={{marginBottom: '13px'}}>{culoare[lang]}</h4>
      {
        product.colors.map((hex, i) => <button name="color" value={i} className={color === i ? "colorchange sel" : "colorchange"} onClick={onChange}><span style={{background: hex}}></span></button>)
      }
    </div>
  )
}

const MemoryChange = ({product, memory, onChange, lang}) => {
  let x = product.filter[lang][memorykey[lang]], memorie={ro:"Memorie :", ru:"Память :" };
  return (product.cattegory == "smartphoane" && x) ? (
            <div className="col-5 col-md-4">
              <h4 >{memorie[lang]}</h4>
              <select className="custom-select memory-select" value={memory} name="memory" onChange={onChange}>
              {
                x.map((memory,i )=> <option value={i} key={i}>{memory}</option>)
              }
              </select>
            </div>)
  : null;
}

// const RamChange = () => (
//   <div className="col-md-4">
//     <h4>Ram :</h4>
//     <select className="custom-select memory-select"><option>4 GB</option><option>6 GB</option></select>
//   </div>
// );

export default ProductPage;