import React from 'react';

export default function ProfilePic(props) {
    console.log("props in pic: ", props);
    return (
        <div>
            <img
                className = "pp"
                src = {props.imageUrl}
                alt = {props.first + props.last}
                onClick = {props.clickHandler}
            />
        </div>
    );
}
