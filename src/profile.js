import React from 'react';
import ProfilePic from "./pic";
import BioEditor from "./bio";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div className="profile-container">
            <div className="ppcontainer">
                <ProfilePic
                    id={props.id}
                    first={props.first}
                    last={props.last}
                    imageUrl={props.imageUrl}
                    clickHandler={props.clickHandler}
                />
            </div>
            <div className="profile-data">
                <h1 className="general-text"> {props.first} {props.last}</h1>
                <BioEditor
                    bio={props.bio}
                    id={props.id}
                />
            </div>
        </div>
    );
}
