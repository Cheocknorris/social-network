import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from 'react-router-dom';



export default function Welcome() {
    return (
        <div>
            <h1> Welcome to Social Network </h1>
            <div>
                <HashRouter>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                </HashRouter>
            </div>
        </div>
    );
}
