import React from "react";
import axios from "./axios";
import FriendButton from "./friend-button";


export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // this log is to find out the dinamic route, in this case id
        // let id = this.props.match.params.id;
        // console.log("props", this.props);
        console.log("this.props.match.params.id: ", this.props.match.params.id);


        // here we want to make a request to server to get
        // all the info about the requested user
        // browser name and server route cannot be the same
        axios.get("/api/user/" + this.props.match.params.id)
            .then (({data}) => {
                console.log("data in get other user: ", data);
                this.setState(data);
                console.log("state in other profile: ", this.state);
                console.log("user id: ", this.state.userId);
                if (this.props.match.params.id == this.state.userId) {
                    this.props.history.push("/");
                }
            });


        // we want the server to send all info about requested user, and the id of the currently logged user.
        // If these are the same, we need to redirect to the /

        //hard coded demo


        // also redirect if user does not exist
    }

    render() {
        return (
            <div className="profile">
                <div className="ppcontainer">
                    <img
                        className = "pp"
                        src = {this.state.imageUrl}
                        alt = {this.state.first + this.state.last}
                    />
                    <div className="profile-data">
                        <h1 className="general-text"> {this.state.first} {this.state.last}</h1>
                        <h2 className="small-text"> {this.state.bio} </h2>
                        <FriendButton
                            id={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>

        );
    }
}
