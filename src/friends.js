import React, { useEffect } from 'react';
// import axios from "./axios";
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes } from './actions';

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
            <div className="friends">
                <h1>Friends should display here</h1>
                <ul>
                    { friends && friends.map(friend => {
                        return <li key={friend.id}> <img
                            className = "pp"
                            src = {friend.imageurl}
                            alt = {friend.first + friend.last}
                        /> {friend.first} {friend.last}</li>;
                    }) }
                </ul>
            </div>
            <div className="wannabes">
                <h1>Wannabes should display here</h1>
                <ul>
                    { wannaBes && wannaBes.map(wannaBe => {
                        return <li key={wannaBe.id}> <img
                            className = "pp"
                            src = {wannaBe.imageurl}
                            alt = {wannaBe.first + wannaBe.last}
                        /> {wannaBe.first} {wannaBe.last}</li>;
                    }) }
                </ul>
            </div>
        </div>
    );

}
