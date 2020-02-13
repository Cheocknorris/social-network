import React from "react";
import axios from "./axios";
import FriendButton from "./friend-button";
import {Friendsfriends} from "./friendsfriends";


export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // this log is to find out the dinamic route, in this case id
        // let id = this.props.match.params.id;
        // console.log("props", this.props);


        // here we want to make a request to server to get
        // all the info about the requested user
        // browser name and server route cannot be the same
        axios.get("/api/user/" + this.props.match.params.id)
            .then (({data}) => {
                console.log("data in get other user: ", data);
                console.log("this.props.match.params.id: ", this.props.match.params.id);
                this.setState(data);
                console.log("state in other profile: ", this.state);
                console.log("user id: ", this.state.userId);
                if (this.props.match.params.id == this.state.userId) {
                    this.props.history.push("/");
                }
                axios.get("/status/" + this.props.match.params.id)
                    .then((statusData) =>{
                        console.log("results from status: ", statusData);
                        console.log("friend status: ", statusData.data.results[0].accepted);
                        this.setState({
                            friends: statusData.data.results[0].accepted
                        });
                        console.log("state after get status: ", this.state);
                        console.log("friends: ", this.state.friends);
                    });
            });
    }

    render() {
        return (
            <div className="profile-main">
                <div className="profile-container">
                    <div className="ppcontainer">
                        <img
                            className = "pp"
                            src = {this.state.imageUrl}
                            alt = {this.state.first + this.state.last}
                        />
                    </div>
                    <div className="profile-data">
                        <h1 className="general-text"> {this.state.first} {this.state.last}</h1>
                        <h2 className="small-text"> {this.state.bio} </h2>
                        <FriendButton
                            id={this.props.match.params.id}
                        />
                    </div>

                </div>
                {this.state.friends == true && <div >
                    <Friendsfriends
                        id={this.props.match.params.id}
                    />
                </div>}
            </div>
        );
    }
}
