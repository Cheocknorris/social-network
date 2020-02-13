import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveUsersFriends } from './actions';
import { Link } from 'react-router-dom';

export const Friendsfriends = ({ id }) => {
    const dispatch = useDispatch();

    const usersFriends = useSelector(
        state => state.usersFriends
    );

    console.log("usersFriends: ", usersFriends);

    useEffect(() => {
        (async() => {
            try {
                console.log("we're in useEffect");
                console.log("id", id);

                dispatch(
                    receiveUsersFriends(id)
                );
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div>
            <div className="friends">
                <h1 className="friend-text">Friends:</h1>
                <div className="friend-container">
                    { usersFriends && usersFriends.map(usersFriend => {
                        return <div className="friend" key={usersFriend.id}>
                            <div className="friend-left">
                                <img
                                    className = "friends-pic"
                                    src = {usersFriend.imageurl}
                                    alt = {usersFriend.first + usersFriend.last}
                                />
                            </div>
                            <div className="friend-right">
                                <a className="friend-name" href={`/user/${usersFriend.id}`}>{usersFriend.first} {usersFriend.last} </a>
                            </div>
                        </div>;

                    }) }
                </div>
            </div>
        </div>
    );
};
