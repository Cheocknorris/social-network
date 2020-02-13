import React, { useEffect } from 'react';
// import axios from "./axios";
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from './actions';
import { Link } from 'react-router-dom';

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state => state.friendsWannabes && state.friendsWannabes.filter(
            friend => friend.accepted == true
        )
    );

    const wannaBes = useSelector(
        state => state.friendsWannabes && state.friendsWannabes.filter(
            wannaBe => wannaBe.accepted == false
        )
    );

    console.log("friends", friends);
    console.log("wannaBes", wannaBes);

    useEffect(() => {
        (async() => {
            try {
                console.log("we're in useEffect");
                dispatch(
                    receiveFriendsWannabes()
                );
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div>
            <div className="wannabes">
                <h1 className="friend-text">These people want to be your friends:</h1>
                <div className="friend-container">
                    { wannaBes && wannaBes.map(wannaBe => {
                        return <div className="friend" key={wannaBe.id}>
                            <div className="friend-left">
                                <img
                                    className = "friends-pic"
                                    src = {wannaBe.imageurl}
                                    alt = {wannaBe.first + wannaBe.last}
                                />
                            </div>
                            <div className="friend-right">
                                <Link className="friend-name" to={`/user/${wannaBe.id}`}>{wannaBe.first} {wannaBe.last} </Link>
                                <button className="friend-button" onClick={ e => dispatch(acceptFriendRequest(wannaBe.id)) }>Accept request</button>
                            </div>
                        </div>;

                    }) }
                </div>
            </div>
            <div className="friends">
                <h1 className="friend-text">These people are currently your friends: </h1>
                <div className="friend-container">
                    { friends && friends.map(friend => {
                        return <div className="friend" key={friend.id}>
                            <div className="friend-left">
                                <img
                                    className = "friends-pic"
                                    src = {friend.imageurl}
                                    alt = {friend.first + friend.last}
                                />
                            </div>
                            <div className="friend-right">
                                <Link className="friend-name" to={`/user/${friend.id}`}>{friend.first} {friend.last} </Link>
                                <button className="friend-button" onClick={ e => dispatch(unfriend(friend.id)) }>End friendship</button>
                            </div>
                        </div>;
                    }) }
                </div>
            </div>

        </div>
    );

}

// e => dispatch(makeHot(users[0].id))
