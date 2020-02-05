import React, { useState, useEffect } from 'react';
import axios from "./axios";


export default function FriendButton(props) {
    console.log("props in button: ", props);
    // console.log("props.id", props.id);
    let id = props.id;
    console.log("id", id);
    const [buttonText, setbuttonText] = useState('');

    useEffect(() => {
        (async() => {
            try {
                console.log("useEffect");
                const {data} = await axios.get("/friends-status/" + id);
                console.log("data", data);
                setbuttonText(data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);


    const handleClick = () => {

        axios.post("/make-friend-request/" + id).then(results => {
            console.log("results", results);
            setbuttonText(results.data);

        }).catch(err => {
            console.log("err", err);
        });

    };



    return (
        <div>
            <button className="general-button" onClick={handleClick}>{buttonText.button}</button>
        </div>
    );
}
