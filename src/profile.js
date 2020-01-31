import React from 'react';
import ProfilePic from "./pic";
import BioEditor from "./bio";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <h1> {props.first} {props.last}</h1>
            <div className="ppcontainer">
                <ProfilePic
                    id={props.id}
                    first={props.first}
                    last={props.last}
                    imageUrl={props.imageUrl}
                    clickHandler={props.clickHandler}
                />
                <BioEditor
                    bio={props.bio}
                    id={props.id}
                />
            </div>

        </div>
    );
}
