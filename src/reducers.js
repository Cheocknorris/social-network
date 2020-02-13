export default function reducer(state ={}, action) {

    if (action.type === 'RECEIVE_FRIENDS_WANNABES') {

        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };

    }

    if (action.type === 'ACCEPT_FRIEND_REQUEST') {

        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(
                friendWannabe => {
                    if (friendWannabe.id == action.id) {
                        return {
                            ...friendWannabe,
                            accepted: true
                        };
                    }
                    return friendWannabe;
                }
            )
        };
    }

    if (action.type === 'UNFRIEND') {

        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                friendWannabe => friendWannabe.id !== action.id
            )

        };
    }

    if (action.type === 'CHATMESSAGES') {

        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type === "CHATMESSAGE") {
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.chatMessage)
        };
    }

    if (action.type === 'RECEIVE_USERS_FRIENDS') {

        state = {
            ...state,
            usersFriends: action.usersFriends
        };

    }

    return state;
}
