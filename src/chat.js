import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector } from 'react-redux';

export default function Chat() {

    const chatMessages = useSelector(
        state => state && state.chatMessages
    );

    console.log("chatMessages", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        // console.log("elemRef: ", elemRef);
        // console.log("scroll top", elemRef.current.scrollTop);
        // console.log("client height", elemRef.current.clientHeight);
        // console.log("scroll height", elemRef.current.scrollHeight);
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("what the user is typing: ", e.target.value);
            console.log("what key user pressed", e.keyCode);
            socket.emit("Chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1> Chat room </h1>
            <div className="chat-container" ref={elemRef}>
                <ul>
                    { chatMessages && chatMessages.map(chatMessage => {
                        return <li key={chatMessage.message_id}> <img
                            className = "pp"
                            src = {chatMessage.imageurl}
                            alt = {chatMessage.first + chatMessage.last}
                        /> {chatMessage.first} {chatMessage.last} {chatMessage.message}</li>;

                    }) }

                </ul>
            </div>
            <textarea
                name="chat"
                rows="5" cols="50"
                onKeyDown = { keyCheck }
            ></textarea>
        </div>

    );
}
