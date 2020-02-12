import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function FindPeople() {

    const [users, setUsers] = useState([]);
    const [userToSearch, setUserToSearch] = useState('');

    console.log("users: ", users);
    console.log("userToSearch", userToSearch);

    const onUserChange = ({ target }) => {
        console.log("target.value in FindPeople: ", target.value);
        setUserToSearch(target.value);
    };

    useEffect(() => {
        let ignore = false;
        if (userToSearch === "") {

            axios.get('/api/users').then(({data}) => {
                console.log('data from getLatestUsers', data);
                setUsers(data.results);
            }).catch(err => {
                console.log(err);
            });
        } else {
            axios.get("/search/" + userToSearch).then(({data}) => {
                console.log('data from search', data);
                if (!ignore) {
                    setUsers(data.results);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [userToSearch]);





    return (
        <div>
            <div className="friends">
                <div className="search">
                    <h1 className="search-text">Looking for someone in particular?</h1>
                    <input className="short-field" onChange={onUserChange} type='text' placeholder='Find new friends' />
                </div>
                <div className="new-users">
                    {userToSearch === "" && <h1 className="friend-text">These people joined lately:</h1>}
                    <div className="new-users-profiles">
                        { users.map(user => {
                            return <div className="friend" key={user.id}>
                                <div className="friend-left">
                                    <img
                                        className = "friends-pic"
                                        src = {user.imageurl}
                                        alt = {user.first + user.last}
                                    />
                                </div>
                                <div className="friend-right">
                                    <p className="friend-name">{user.first} {user.last}</p>
                                    <Link className="go-profile" to={`/user/${user.id}`}>Go to profile </Link>
                                </div>
                            </div>;
                        }) }
                    </div>
                </div>
            </div>
        </div>
    );
}
