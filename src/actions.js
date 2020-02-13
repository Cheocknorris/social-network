import axios from './axios';


export async function receiveFriendsWannabes() {


    try {
        console.log("action receiveFriendsWannabes taking place");
        const {data} = await axios.get("/friends-wannabes/");
        console.log("data", data.results.rows);

        return {
            type: 'RECEIVE_FRIENDS_WANNABES',
            friendsWannabes: data.results.rows
        };

    } catch (err) {
        console.log(err);
    }
}

export async function acceptFriendRequest(id) {
    console.log("id", id);
    try {
        console.log("action acceptFriendRequest taking place");
        const {data} = await axios.post("/accept-friend-request/" + id);
        console.log("data in acceptFriendRequest", data);
        //
        return {
            type: 'ACCEPT_FRIEND_REQUEST',
            id: id
        };

    } catch (err) {
        console.log(err);
    }
}


export async function unfriend(id) {
    console.log("id", id);
    try {
        console.log("action unfriend taking place");
        const {data} = await axios.post("/end-friendship/" + id);
        console.log("data in acceptFriendRequest", data);

        return {
            type: 'UNFRIEND',
            id: id
        };

    } catch (err) {
        console.log(err);
    }
}


export function chatMessages(msgs) {
    console.log("msgs", msgs);
    return {
        type: 'CHATMESSAGES',
        chatMessages: msgs
    };
}

export function chatMessage (msg) {
    console.log("msg: ", msg);
    return {
        type: "CHATMESSAGE",
        chatMessage: msg
    };
}

export async function receiveUsersFriends(id) {


    try {
        console.log("action receiveUsersFriends taking place");
        const {data} = await axios.get("/user-friends/" + id);
        console.log("data", data.results.rows);
        return {
            type: 'RECEIVE_USERS_FRIENDS',
            usersFriends: data.results.rows
        };

    } catch (err) {
        console.log(err);
    }
}
