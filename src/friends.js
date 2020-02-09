import React, { useEffect } from 'react';
// import axios from "./axios";
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest } from './actions';

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
                <h1>These people want to be your friends:</h1>
                <ul>
                    { wannaBes && wannaBes.map(wannaBe => {
                        return <li key={wannaBe.id}> <img
                            className = "pp"
                            src = {wannaBe.imageurl}
                            alt = {wannaBe.first + wannaBe.last}
                        /> {wannaBe.first} {wannaBe.last} <button onClick={ e => dispatch(acceptFriendRequest(wannaBe.id)) }>Accept request</button></li>;

                    }) }

                </ul>
            </div>
            <div className="friends">
                <h1>These people are currently your friends: </h1>
                <ul>
                    { friends && friends.map(friend => {
                        return <li key={friend.id}> <img
                            className = "pp"
                            src = {friend.imageurl}
                            alt = {friend.first + friend.last}
                        /> {friend.first} {friend.last} <button>End friendship</button></li>;
                    }) }
                </ul>
            </div>

        </div>
    );

}

// e => dispatch(makeHot(users[0].id))
