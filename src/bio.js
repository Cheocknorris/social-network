import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    // addBio() {
    //     console.log("this.state", this.state);
    //     console.log("add bio clicked");
    //     this.setState ({
    //         editorIsVisible: true
    //     });
    // }
    submitBio() {
        console.log("bio in edit", this.state.bio);
        console.log("props in bio", this.props);
        console.log("id in bio", this.props.id);
        console.log("submit bio clicked");
        axios.post("/bio", {
            bio: this.state.bio,
            id: this.props.id
        })
            .then ( results => {
                console.log("results:", results);
            });

        this.setState ({
            editorIsVisible: false
        });
    }
    render() {
        return(
            <div>

                {this.state.error && <div className="error">Something went wrong...</div>}
                {!this.state.bio && !this.state.editorIsVisible && <div>
                    <button onClick={e => this.setState({
                        editorIsVisible: true
                    })}> Add bio </button>
                </div>}
                {this.state.editorIsVisible && <div>
                    <textarea name="bio" rows="10" cols="50" defaultValue={this.state.bio} onChange={e => this.handleChange(e)}></textarea>
                    <button onClick={e => this.submitBio()}> Submit </button>
                </div>}
                {this.state.bio && !this.state.editorIsVisible && <div>
                    <h2>{this.state.bio}</h2>
                    <button onClick={e => this.setState({
                        editorIsVisible: true
                    })}> Edit bio </button>
                </div>}
            </div>
        );
    }
}
