import React from 'react';

export default function ProfilePic(props) {
    console.log("props in pic: ", props);
    return (
        <div>
            <img
                src = {props.imageUrl}
                alt = {props.first + props.last}
                onClick = {
                    () => { props.clickHandler();
                        console.log("pic clicked"); }
                }
            />
        </div>
    );
}
