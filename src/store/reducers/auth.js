import { AUTH } from '../actions/auth';

const initialState = {
    phoneNumber: '',
    authentificated: false,
    error: '',
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.ADD: 
            const phone = action.payload;
            return {...state, phoneNumber: phone }
        case AUTH.UPDATE: 
            const authentificated = action.payload;
            console.log(authentificated);
            return {...state, authentificated: authentificated }
        case AUTH.DELETE: 
            return { state, phoneNumber: '', authentificated: false };
        default :
            return state;
    }
}

export default AuthReducer;