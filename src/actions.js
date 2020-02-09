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
