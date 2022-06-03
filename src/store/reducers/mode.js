import {
    SIGNUP,
    LOGIN,
    FIND_ID,
    FIND_PWD,
    CALCULATOR,
    CONTACT
} from '../actions/mode';

const initialState = {
    signup: false,
    login: false,
    findId: false,
    findPwd: false,
    calculator: false, 
    contact: false
};

const ModeReducer = (state = initialState, action ) => {
    switch(action.type) {
        case SIGNUP.ACTIVATE: 
            return {...initialState, signup: true };
        case SIGNUP.DEACTIVATE:
            return {...initialState, signup: false };
        case LOGIN.ACTIVATE: 
            return {...initialState, login: true };
        case LOGIN.DEACTIVATE:
            return {...initialState, login: false };
        case FIND_ID.ACTIVATE: 
            return {...initialState, findId: true };
        case FIND_ID.DEACTIVATE:
            return {...initialState, findId: false };
        case FIND_PWD.ACTIVATE: 
            return {...initialState, findPwd: true };
        case FIND_PWD.DEACTIVATE:
            return {...initialState, findPwd: false };
        case CALCULATOR.ACTIVATE: 
            return {...initialState, calculator: true };
        case CALCULATOR.DEACTIVATE:
            return {...initialState, calculator: false };
        case CONTACT.ACTIVATE: 
            return {...initialState, calculator: true };
        case CONTACT.DEACTIVATE:
            return {...initialState, calculator: false };
        default:
            return initialState;
    }
};

export default ModeReducer;