import React from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';


export default class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: '',
            newPassword: '',
            secretCode: ''
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    startReset() {
        console.log("this.state", this.state);
        axios.post("/reset/start", {
            email: this.state.email
        }).then (({data}) => {
            console.log("data in startReset post: ", data);
            if (data.success) {
                console.log("success in reset/start post");
                this.setState ({
                    step: 2
                });
            } else {
                console.log("failure in reset/start post");
                this.setState ({
                    error: true
                });
            }
        });
    }
    setNewPasswrord() {
        console.log("this.state", this.state);
        axios
            .post('/reset/update', {
                email: this.state.email,
                secretCode: this.state.secretCode,
                newPassword: this.state.newPassword
            })
            .then (({data}) => {
                console.log("data in /reset/update post: ", data);
                if (data.success) {
                    console.log("success in /reset/update post");
                    this.setState ({
                        step: 3
                    });
                } else {
                    console.log("failure in /reset/update post");
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
                {this.state.step == 1 && <div>
                    <h2>Reset passowrd</h2>
                    <h3>Please enter the email address with which you registered</h3>
                    <input name="email" placeholder="Email" onChange={e => this.handleChange(e)} />
                    <button onClick={e => this.startReset()}> Submit </button>
                </div>}
                {this.state.step == 2 && <div>
                    <h2>Reset passowrd</h2>
                    <h3>Please enter the code you received</h3>
                    <input name="secretCode" placeholder="Secret code" onChange={e => this.handleChange(e)} />
                    <h3>Please enter a new password</h3>
                    <input name="newPassword" placeholder="New password" type="password" onChange={e => this.handleChange(e)} />
                    <button onClick={e => this.setNewPasswrord()}> Submit </button>
                </div>}
                {this.state.step == 3 && <div>
                    <h2>Reset passowrd</h2>
                    <h3>Success!</h3>
                    <p>You can now log in with your new password</p>
                    <Link to="/login">Log in</Link>
                </div>}
            </div>
        );
    }
}
