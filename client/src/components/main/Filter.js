import React from "react";
import isEmpty from 'lodash/isEmpty';
import { Scrollbars } from 'react-custom-scrollbars';
import InputRange from 'react-input-range';
import {isMobile} from '../helpers';
import './range.css';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state= {   
            ...this.getAllFilters(props.products, props.lang),
            open: false
        }
        this.toggleOpen=this.toggleOpen.bind(this);
        
    }

    getAllFilters(products,lang) {
        let allFilters = {},max=0,min=99999;
        products.forEach((product)=> {
          for (let x in product.filter[lang]) {
              if(!allFilters[x]) allFilters[x]=[];
              product.filter[lang][x].forEach((el) => {
                  if(allFilters[x].indexOf(el)==-1) allFilters[x].push(el);
              });
          }
      });
      for(let x in allFilters) allFilters[x].sort((a,b)=> String(a).localeCompare(String(b), undefined, {numeric: true, sensitivity: 'base'}));
      products.forEach((p)=> {
          p.price.forEach((price)=> {
              if(price>max) max=price;
              if(price<min) min=price; 
          })});
      return {allFilters, max, min} ;
      }

      toggleOpen() {
          this.setState((state)=> ({open: !state.open}), () => document.documentElement.classList.toggle('noscroll'))
      }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.products.length,this.props.products.length);
        (nextProps.products.length !== this.props.products.length || nextProps.lang !== this.props.lang) && this.setState( {...this.getAllFilters(nextProps.products, nextProps.lang)});
    }


    render() {
    let criterions=[],i=0, filtru={ro: "Filtru", ru: "Фильтр"}, done={ro: "OK", ru: "ОК"};
        for(let criteriu in this.state.allFilters) {
        criterions.push(<Criteriu id={i} key={i++} criterion={criteriu} values={this.state.allFilters[criteriu]} checked={this.props.filter[criteriu] || []} onToggle={this.props.onFilter} />);
        }
        //style={isMobile(this.props.width) && !this.state.open ? { height: "0%", padding: 0} : {height: "100%"}}
        return !isEmpty(this.state.allFilters) && this.props.products.length > 1 ? (
            <div className={isMobile(this.props.width) ? (this.state.open ? "filtru-mobile" : "filtru-mobile closed") : "sidebar filtru"}   >
                <h3 className="filter-title">{filtru[this.props.lang]}<i class="d-block d-sm-none done" onClick={this.toggleOpen}>{done[this.props.lang]}</i></h3>
                <hr className="filter"/>
                <PriceFilter lang={this.props.lang} changePrice={this.props.changePrice} max={this.state.max} min={this.state.min} value={this.props.price}/>
                    {criterions}
                    
            </div>) 
        : null;
}
}

const PriceFilter = ({lang, max, min, value, changePrice}) => {
    let pret= {ro: "Preț", ru: "Цена"};
    return (
    <div className="criteriu">
    <h5 className="filter-type">{pret[lang]}</h5>
    <InputRange step={5} 
        maxValue={max}
        minValue={min}
        allowSameValues
        value={!isEmpty(value) ? value : {max,min}}
        onChange={value => changePrice(value)} />
    <div className="price-inputs">
        <input type="text" value={value.min || min} name="min" onChange={(e)=> changePrice({min: +e.target.value, max})} className="price-input float-left"/>
        <i> - </i>
        <input type="text" value={value.max || max} name="max" onChange={(e)=> changePrice({max: +e.target.value, min})} className="price-input float-right"/>
    </div>  
    </div>
    )
}

class Criteriu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            down : props.id < 3,
            full : 0
        }
        this.toggleDown = this.toggleDown.bind(this);
        this.toggleFull = this.toggleFull.bind(this);
    }

   toggleDown() {
       this.setState((state) => ({down: !state.down}));
   }

   toggleFull() {
       this.setState((state)=> ({full: !state.full}));
   }

     render() {
        let values = this.props.values.map((criteriu, i) => (
            <div className="filter-group">
                <input type="checkbox" checked={this.props.checked.includes(criteriu)} key={this.props.criterion.replace(/\s/g,"_")+i} name={this.props.criterion} value={criteriu} onChange={this.props.onToggle}/>
                <label  htmlFor={this.props.criterion.replace(/\s/g,"_")+i} className="filter-label">{criteriu}</label>      
            </div>));

        return (
            <div className="criteriu" >
            <h5 className="filter-type" onClick={this.toggleDown}>{this.props.criterion}
            {/* <i onClick={(e)=> props.onDropdown(props.criterion)} style={props.down ? {} : {transform: 'rotate(-90deg)'}} class={"codita" } ></i> */}
            {/* <i class={props.down ? "fas fa-angle-down d-block" : "fas fa-angle-right d-block d-md-none"}></i> */}
            <i class={this.state.down ? "fal fa-times" : "fal fa-plus"}></i>
            </h5>           
             {this.state.down && 
            //  onScroll={(ev)=> {ev.target.scrollTop = 28*Math.floor(ev.target.scrollTop/28)}}  
                 <Scrollbars  autoHeight  autoHideDuration={1} autoHeightMax={274} autoHide style={{marginBottom: "8px"}} >
                <div style={{display:'inline-block'}}>
                    {
                        values
                    //values.length < 11 ? values : this.state.full ? values.concat(<Less onClick={this.toggleFull}/>) : values.slice(0,10).concat(<More onClick={this.toggleFull}/>) 
                    }
                </div>
                 </Scrollbars>
             }
            {/* <hr className="filter"/> */}
        </div>
    );

    }
}
   

export default Filter;