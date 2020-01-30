import React from 'react';
import axios from './axios';
import ProfilePic from './pic';
import Uploader from './uploader';

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
            </div>
        );
    }
}
