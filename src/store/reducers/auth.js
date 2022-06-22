import { AUTH } from '../actions/auth';

const initialState = {
    phoneNumber: '',
    authNumber: '',
    active: false,
    success: false,
    description: '',
    error: '',
    authApi: () => {}
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.ACTIVATE: 
            const description = action.payload.description;
            return {...state, active: true, description: description };
        case AUTH.DEACTIVATE: 
            return initialState;
        case AUTH.SET_PHONENUMBER: 
            const phoneNum = action.payload;
            return {...state, phoneNumber: phoneNum};
        case AUTH.SET_AUTHNUMBER: 
            const authNum = action.payload;
            return {...state, authNumber: authNum};
        case AUTH.CHECK_AUTHNUM:
            const isMatched = state.authNumber === action.payload;
            const errorMsg = isMatched? "" : "인증번호가 일치하지 않습니다."
            return {...state, success: isMatched, error: errorMsg};
        case AUTH.SET_ERROR: 
            const errMsg = action.payload;
            return {...state, error: errMsg};
        default :
            return state;
    }
}

export default AuthReducer;