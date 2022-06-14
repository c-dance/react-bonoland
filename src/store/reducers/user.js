import { USER } from "../actions/user";

const initialState = {
    loggedIn: false,
    id: '',
    name: ''
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER.LOGIN: 
            const userInfo = action.payload;
            return {...state, loggedIn: true, id: userInfo.id, name: userInfo.name};
        case USER.LOGOUT: 
            return initialState;
        default: 
            return state;
    }
};

export default UserReducer;
