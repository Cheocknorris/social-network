import React from 'react';
import axios from './axios';
import ProfilePic from './pic';
import Uploader from './uploader';
import Profile from './profile';
import FindPeople from "./find-people";
import OtherProfile from "./other-profile";
import Friends from "./friends";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Chat  from './chat';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then (({data}) => {
            this.setState(data);
            // console.log("data in component mount:", this.state);
        });
    }
    render() {
        if (!this.state.id) {
            return "Loading...";
        }
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <header>
                            <div className="app-logo">
                                <div className="app-pic">
                                    <img className="app-flag" src="/skull.png" alt=""></img>
                                </div>
                                <p className="app-welcome-text"> MEXICANS IN BERLIN </p>
                            </div>
                            <div className="menu">
                                <Link className="menu-link" to="/">Your profile </Link>
                                <Link className="menu-link" to="/friends">Your friends </Link>
                                <Link className="menu-link" to="/users">Find friends </Link>
                                <a className="menu-link-right" href="/logout">Log out</a>
                            </div>

                            <ProfilePic
                                clickHandler={
                                    () => this.setState({uploaderIsVisible: true})
                                }
                                imageUrl={this.state.imageUrl}
                                first={this.state.first}
                                last={this.state.last}
                            />

                        </header>
                        {this.state.uploaderIsVisible && <Uploader
                            setImageUrl={imageUrl => this.setState({
                                imageUrl: imageUrl,
                                uploaderIsVisible: false
                            })}
                        />}
                        <Route exact path="/" render={
                            () =>
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.imageUrl}
                                    clickHandler={
                                        () => this.setState({uploaderIsVisible: true})
                                    }
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                        }/>

                        <Route path="/users" component={ FindPeople }/>

                        <Route path="/user/:id" component={ OtherProfile }/>

                        <Route path="/friends" component={ Friends }/>

                        <Route path="/chat" component={ Chat }/>

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
