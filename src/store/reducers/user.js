import { USER } from "../actions/user";

const initialState = {
    loggedIn: false,
    userInfo: {
        id: '',
        name: '',
        tel: '',
        memo: '',
        alarms: ''
    },
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER.LOGIN: 
            const user = action.payload;
            return {...state, loggedIn: true, userInfo: user};
        case USER.LOGOUT: 
            return initialState;
        default: 
            return state;
    }
};

export default UserReducer;
