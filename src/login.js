import React from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
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
        axios.post("/login", {
            email: this.state.email,
            password: this.state.password
        }).then (({data}) => {
            console.log("data in login post: ", data);
            if (data.success) {
                console.log("success in login post");
                location.replace("/");
            } else {
                console.log("failure in login post");
                this.setState ({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Something went wrong...</div>}
                <h2>Please enter your email and password</h2>
                <input name="email" placeholder="Email" onChange={e => this.handleChange(e)} />
                <input name="password" placeholder="password" type="password" onChange={e => this.handleChange(e)} />
                <button onClick={e => this.submit()}> Log in </button>
                <Link to="/reset">Forgot your password?</Link>
            </div>
        );
    }
}
