import { AUTH } from '../actions/auth';

const initialState = {
    phoneNumber: '',
    authentificated: null,
    error: '',
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.ADD: 
            const phone = action.payload;
            return {...state, phoneNumber: phone }
        case AUTH.UPDATE: 
            const result = action.payload;
            return {...state, authentificated: true }
        case AUTH.DELETE: 
            return initialState;
        default :
            return state;
    }
}

export default AuthReducer;