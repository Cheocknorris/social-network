import React from 'react';
import axios from './axios';
import ProfilePic from './pic';
import Uploader from './uploader';
import Profile from './profile';
import OtherProfile from "./other-profile";
import { BrowserRouter, Route } from "react-router-dom";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then (({data}) => {
            this.setState(data);
            console.log("data in component mount:", this.state);
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
                                <img className="app-flag" src="/mexico.png" alt=""></img>
                                <p className="app-welcome-text"> Mexicanos en Berlín </p>
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

                        <Route path="/user/:id" component={ OtherProfile }/>

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
