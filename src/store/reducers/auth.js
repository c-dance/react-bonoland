import { AUTH } from '../actions/auth';

const initialState = {
    phoneNumber: '',
    success: false,
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.PHONE_NUMBER: 
            const phone = action.payload;
            return {...state, phoneNumber: phone }
        case AUTH.SUCCESS: 
            const authSuccess = action.payload;
            return {...state, success: authSuccess }
        default :
            return state;
    }
}

export default AuthReducer;