import React, { useState, useEffect } from 'react';
import axios from "axios";

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
            <h1>Here we show latest three users</h1>
            <ul>
                { users.map(user => {
                    return <li key={user.id}> <img
                        className = "pp"
                        src = {user.imageurl}
                        alt = {user.first + user.last}
                    /> {user.first} {user.last}</li>;
                }) }
            </ul>
            <input onChange={onUserChange} type='text' placeholder='countries to search for' />
        </div>
    );
}
