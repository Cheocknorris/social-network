import React from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({

            [e.target.name]: e.target.value,

        });
    }
    submit() {
        console.log("this.state", this.state);
        //make axios request
        // axios.post("/register", this.state);
        axios.post("/register", {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }).then (({data}) => {
            console.log("data in register post: ", data);
            if (data.success) {
                // it worked
                location.replace("/");
            } else {
                // failure
                this.setState ({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div className="register">

                {this.state.error && <div className="error">Ooops!</div>}
                <h2 className="general-text">Register to continue</h2>
                <div className="register-middle">
                    <input className="short-field" name="first" placeholder="First name" onChange={e => this.handleChange(e)} />
                    <input className="short-field" name="last" placeholder="Last name" onChange={e => this.handleChange(e)} />
                </div>
                <input className="large-field" name="email" placeholder="Email" onChange={e => this.handleChange(e)} />
                <input className="large-field" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)} />


                <button className="general-button" onClick={e => this.submit()}> Register </button>
                <Link className="general-link" to="/login">Already a member? Click here to log in </Link>

            </div>
        );
    }
}
