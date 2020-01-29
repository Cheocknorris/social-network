import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from 'react-router-dom';
import Reset from "./reset";



export default function Welcome() {
    return (
        <div>
            <h1> Welcome to Social Network </h1>
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
