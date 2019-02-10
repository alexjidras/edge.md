import React from 'react';
import Api from './Api';
import Code from './Code';
import AdminBar from './AdminBar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


class New extends React.Component {
    constructor(props) {
        state = {
            tabindex: 0
        }
        this.onPreview=this.onPreview.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onClear=this.onClear.bind(this);
    }

    onClear() {
        this.state.tabindex === 1 ? this.code.clear() : this.api.clear();
    }

    onPreview() {
        this.props.onPreview({product: this.state.tabindex === 1 ? JSON.parse(this.code.getCode()) : toProduct(this.api.getProduct())});
    }

    onSubmit() {
        this.props.onSubmit({product: this.state.tabindex === 1 ? JSON.parse(this.code.getCode()) : toProduct(this.api.getProduct())}, 'POST');
    }

    render() {
        return (
            <React.Fragment>
                <AdminBar onClear={this.onClear} onPreview={this.onPreview} onSubmit={this.onSubmit}/>
                <Tabs selectedIndex={this.state.tabindex} onSelect={(index) => this.setState({tabindex: index})} selectedTabClassName="tab tab-selected" >
                    <TabList style={{backgroundColor: '#F5F5F5', borderBottom: '0px', marginBottom: '0px'}}>
                        <Tab className={'tab'}>API</Tab>
                        <Tab className={'tab'}>Code</Tab>
                    </TabList>
                    <TabPanel style={{padding: '0px 20px', background: "#fff"}}><Api onPreview={this.onPreview} onSubmit={this.onSubmit} ref={(api)=>this.api = api}/></TabPanel>
                    <TabPanel style={{background: "#fff"}}><Code ref={(code)=> this.code = code}/></TabPanel>
                </Tabs>
            </React.Fragment>
        )
    }
}

export default New;