import React from 'react';
import { Switch, Route } from "react-router-dom";

const FooterWrap = ({search}) =>

        search ? (
            <div className="row">
                <div className="col-md-4 col-lg-3 side"></div>
                <div className="col-md-8 col-lg-9 foo"><Footer/></div>
            </div>)
                : (
                <Switch>
                    <Route path="*(/|/smartphoane|/ceasuri|/accesorii|/tablete)" render={
                        () => (
                            <div className="row">
                                <div className="col-md-4 col-lg-3 side"></div>
                                <div className="col-md-8 col-lg-9 foo"><Footer/></div>
                            </div>
                        )
                    } />
                    <Route path="/:id(\d+)" render={() => <div className="row"><div className="col-12 foo"><Footer/></div></div> }/>
                </Switch>) 


const Footer = () => <footer className="">{`Copyright © Edge.md ${new Date().getFullYear()}`}</footer>;

export default FooterWrap;