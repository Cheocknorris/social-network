import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from 'react-router-dom';
import Reset from "./reset";



export default function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome-up">
                <div className="logo-container">
                    <img className="welcome-flag" src="skull.png" alt=""></img>
                </div>
                <div className="welcome-logo">
                    <h1 className="welcome-text"> MEXICANS IN BERLIN </h1>
                </div>
            </div>
            <div className="welcome-down">
                <HashRouter>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/reset" component={Reset} />
                </HashRouter>
            </div>
        </div>
    );
}
