import React from "react";
import axios from "axios";

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
            <div>

                {this.state.error && <div className="error">Ooops!</div>}
                <input name="first" placeholder="First name" onChange={e => this.handleChange(e)} />
                <input name="last" placeholder="Last name" onChange={e => this.handleChange(e)} />
                <input name="email" placeholder="Email" onChange={e => this.handleChange(e)} />
                <input name="password" placeholder="password" type="password" onChange={e => this.handleChange(e)} />
                <button onClick={e => this.submit()}> Register </button>
            </div>
        );
    }
}
