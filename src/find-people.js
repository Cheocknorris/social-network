import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function FindPeople() {

    const [users, setUsers] = useState([]);
    // const [user, setUser] = useState('');

    console.log("users: ", users);
    // console.log("user", user);

    const onUserChange = ({ target }) => {
        console.log("target.value in FindPeople: ", target.value);
    };

    useEffect(() => {
        axios.get('/api/users').then(({data}) => {
            console.log('data from getLatestUsers', data);
            setUsers(data.results);
        }).catch(err => {
            console.log(err);
        });
    }, []);



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
