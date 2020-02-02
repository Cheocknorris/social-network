import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from 'react-router-dom';
import Reset from "./reset";



export default function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome-logo">
                <img className="welcome-flag" src="mexico.png" alt=""></img>
                <h1 className="welcome-text"> Mexicanos en Berlín </h1>
            </div>
            <div>
                <HashRouter>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/reset" component={Reset} />
                </HashRouter>
            </div>
        </div>
    );
}
