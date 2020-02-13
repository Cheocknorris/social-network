import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        console.log("e.target", e.target.files[0].name);
        this.setState ({
            file: e.target.files[0]
        });
    }
    upload(e) {
        e.preventDefault();
        console.log("upload button clicked");
        console.log("imageUrl: ", this.state.file);
        console.log("this.state: ", this.state);
        let formData = new FormData();

        formData.append("file", this.state.file);

        axios.post("/upload",
            formData
        ).then ( results => {
            console.log("results:", results);

            this.props.setImageUrl(results.data.newPic);

        });
    }
    render() {
        return (
            <div className="uploader-container">
                <div className="uploader">
                    <a className="close" href="/">x</a>
                    <h1 className="general-text">Do you want to upload a picture?</h1>
                    <form className="uploader-form">
                        <input className="inputfile" name="file" type="file" onChange={e => this.handleChange(e)}/>

                        <button className="pink-button" onClick={e => this.upload(e)}>Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}
