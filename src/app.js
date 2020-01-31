import React from 'react';
import axios from './axios';
import ProfilePic from './pic';
import Uploader from './uploader';
import Profile from './profile';

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
                <header>
                    <h1>Logo in App</h1>
                    <ProfilePic
                        clickHandler={
                            () => this.setState({uploaderIsVisible: true})
                        }
                        imageUrl={this.state.imageUrl}
                        first={this.state.first}
                        last={this.state.last}
                    />
                    {this.state.uploaderIsVisible && <Uploader
                        setImageUrl={imageUrl => this.setState({
                            imageUrl: imageUrl,
                            uploaderIsVisible: false
                        })}
                    />}
                </header>
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
            </div>
        );
    }
}
