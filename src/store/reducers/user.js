import { USER } from "../actions/user";

const initialState = {
    loggedIn: false,
    userInfo: {
        type: '',
        no: -1,
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
            console.log(user);
            return {...state, loggedIn: true, userInfo: user};
        case USER.UPDTATE: 
            const newInfo = action.payload;
            return {...state, userInfo: {...state.userInfo, ...newInfo }};
        case USER.LOGOUT: 
            return {...state, loggedIn: false, userInfo: initialState.userInfo};
        default: 
            return state;
    }
};

export default UserReducer;
