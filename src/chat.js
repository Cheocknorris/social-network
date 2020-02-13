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
    }, [chatMessages]);

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
            <h1 className="chat-title"> Chat room </h1>
            <div className="chat-container" ref={elemRef}>
                <div>
                    { chatMessages && chatMessages.map(chatMessage => {
                        return <div className="chat-messages" key={chatMessage.message_id}>
                            <div className="friend-left">
                                <img
                                    className = "chat-pic"
                                    src = {chatMessage.imageurl}
                                    alt = {chatMessage.first + chatMessage.last}
                                />
                            </div>
                            <div className="friend-right">
                                <p className="chat-name">{chatMessage.first} {chatMessage.last}:</p>
                                <p className="chat-text">{chatMessage.message}</p>
                            </div>
                        </div>;

                    }) }

                </div>
            </div>
            <textarea
                name="chat"
                rows="5" cols="70"
                onKeyDown = { keyCheck }
            ></textarea>
        </div>

    );
}
