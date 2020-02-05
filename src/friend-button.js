import React, { useState, useEffect } from 'react';
import axios from "./axios";


export default function FriendButton(props) {
    console.log("props in button: ", props);
    // console.log("props.id", props.id);
    let id = props.id;
    console.log("id", id);

    const [buttonText, setbuttonText] = useState('');

    axios.get("/friends-status/" + id)
        .then(({data}) => {
            console.log('data.results from status', data.results);
            if (data.results.length == 0) {
                console.log("in if");
                setbuttonText("Send friend request");
            }

        })
        .catch(err => {
            console.log(err);
        });


    return (
        <div>
            <button>{buttonText}</button>
        </div>
    );
}
