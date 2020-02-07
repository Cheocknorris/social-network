import axios from './axios';


export async function receiveFriendsWannabes() {
    // AXIOS

    try {
        console.log("action receiveFriendsWannabes taking place");
        const {data} = await axios.get("/friends-wannabes/");
        console.log("data", data.results.rows);

        return {
            type: 'RECEIVE_FRIENDS_WANNABES',
            friendsWannabes: data.results.rows
        };

    } catch (e) {
        console.log(e);
    }


}
