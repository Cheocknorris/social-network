export default function reducer(state ={}, action) {

    if (action.type === 'RECEIVE_FRIENDS_WANNABES') {
        ///make copy of state and do whats needed
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
// for arrays,
// map: for changing items in array
//  filter to remove items form array
//  concat combine two or more arrays into one
//   spread copy arrays and add properties to the copies

    }


    return state;
}
