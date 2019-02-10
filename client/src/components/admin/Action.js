import React from 'react';
import ProductPage from '../product/ProductPage';
import { Route } from "react-router-dom";
import "./css/admin.css";
import { toProduct} from '../helpers';
import Specs from '../product/Specs';
import isEmpty from 'lodash/isEmpty';
import Console from './Console';
import Resizable from 're-resizable';
// import New from './New';
// import Edit from './Edit';
import Api from './Api';
import Code from './Code';
import AdminBar from './AdminBar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Action extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            output: [],
            width: this.getWidth(props),
            tabindex: 0
        }

       

        this.onPreview=this.onPreview.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onClear=this.onClear.bind(this);
    }
     
    
    getWidth = (props=this.props) => Math.floor(props.width * 4.5/12);

    componentWillReceiveProps(nextProps) {
        this.setState({width: this.getWidth(nextProps)})
    }

    // componentDidCatch(e) {
    //     this.setState((state)=> ({output: state.output.concat({error: true, message: e})}));
    // }

    componentDidUpdate() {
        this.console.setHeight(this.preview ? this.preview.clientHeight : 0);
    }
    
    onClear() {
        this.props.match.params['action'] === "new" && this.state.tabindex === 0 ? this.api.clear() : this.code.clear();
    }
    onPreview(cb) {  
        this.setState({product: this.props.match.params['action'] === "new" && this.state.tabindex === 0 ? toProduct(this.api.getProduct()) : JSON.parse(this.code.getCode())}, ()=> {
            window.scrollTo(0, 0);
            cb && cb(this.state.product);
        });
    }

    onSubmit() {
        this.onPreview((product) => {
            fetch('/server/api', {method: this.props.match.params['action'] === "new" ? "POST" : "PUT", body: JSON.stringify(product), headers: {"Content-Type": "application/json", "X-API-KEY": this.props.api_key}, credentials: "same-origin"}).then((res) =>
                res.status === 200 ? res.json().then((product) => 
                    this.setState((state)=> ({output: state.output.concat({error: false, status: `${res.status} ${res.statusText}`})}),
                    () => {try{this.props.updateProducts([...this.props.products.filter((p) => p.id !== product.id), product])} catch(e) {console.log(typeof product)} }))
                : res.text().then((text)=>
                    this.setState((state)=> ({output: state.output.concat({error: true, status: `${res.status} ${res.statusText}`, message: text})}),
                    )));           
        })
    }



    render() {
        return (

            
            <div className="row admin-row ">
                    <Resizable className={"admin-left"} size={{ width: this.state.width}}  enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }} onResizeStop={(e, direction, ref, d) => 
                    { this.setState({
                        width: this.state.width + d.width
                        });
                    }}>
                     
                        <Route path="/admin/products/new" render={(props)=> (
                            <Tabs selectedIndex={this.state.tabindex} onSelect={(index) => this.setState({tabindex: index})} selectedTabClassName="tab tab-selected" >
                            <TabList style={{backgroundColor: '#F5F5F5', borderBottom: '0px', marginBottom: '0px', marginTop:'-1px'}}>
                                <Tab className={'tab'}>API</Tab>
                                <Tab className={'tab'}>Code</Tab>
                            </TabList>
                            <TabPanel style={{padding: '0px 20px', background: "#fff"}}><Api onPreview={this.onPreview} onSubmit={this.onSubmit} ref={(api)=>this.api = api}/></TabPanel>
                            <TabPanel style={{background: "#fff",height:'calc(100% - 32px)'}}><Code height={"calc(100% - 30px)"} ref={(code)=> this.code = code}/></TabPanel>
                        </Tabs>
                        )}/>
                        <Route path="/admin/products/edit/:id(\d+)" render={(props)=> <Code height={"calc(100% - 79px)"} code={JSON.stringify(this.props.products.find((product)=> product.id === +props.match.params.id), null, 2)} ref={(code)=> this.code = code} lang={this.props.lang} />} />
                        <AdminBar onClear={this.onClear} onPreview={this.onPreview} onSubmit={this.onSubmit} action={this.props.match.params['action']}/>
                        {/* <Route path="/admin/products/new" render={(props)=> <New {...props} lang={this.props.lang} width={this.props.width} />} />
                        <Route path="/admin/products/edit/:id(\d+)" render={(props)=> <Edit {...props} product={this.props.products.find((product)=> product.id === +props.match.params.id)} lang={this.props.lang} width={this.props.width} />} />                        */}
                    </Resizable>
                    <div className="col admin-right" style={{width: `${this.props.width - this.state.width - 300}px`}} >                                
                        {!isEmpty(this.state.product) && 
                            <div className="col-11" ref={(preview)=> this.preview = preview}>
                                <ProductPage {...this.props} lang={this.props.lang} product={this.state.product} width={this.props.width}/>
                                <Specs {...this.props} product={{...this.state.product, video: ""}}/>
                            </div>
                        }
                        <Console output={this.state.output}  ref = {(console) => this.console = console} />
                    </div>                   
                </div>   
           
        )
    }
}

export default Action;