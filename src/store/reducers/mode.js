import {
    SIGNUP,
    LOGIN,
    FIND_ID,
    FIND_PWD,
    CALCULATOR,
    CONTACT,
    ALARM,
    LOGIN_REQUIRED
} from '../actions/mode';

const initialState = {
    signup: false,
    login: false,
    findId: false,
    findPwd: false,
    calculator: false, 
    contact: false,
    alarm: false,
    loginRequired: false,
    calculatorData: null,
    contactData: null
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
            return {...initialState, calculator: true, calculatorData: action.payload };
        case CALCULATOR.DEACTIVATE:
            return {...initialState, calculator: false, calculatorData: null };
        case CALCULATOR.RESET:
            return {...state, calculatorData: action.payload };
        case CONTACT.ACTIVATE: 
            return {...initialState, contact: true, contactData: action.payload };
        case CONTACT.DEACTIVATE:
            return {...initialState, contact: false, contactData: null };
        case ALARM.ACTIVATE: 
            return {...initialState, alarm: true };
        case ALARM.DEACTIVATE:
            return {...initialState, alarm: false };
        case LOGIN_REQUIRED.ACTIVATE: 
            return {...initialState, loginRequired: true };
        case LOGIN_REQUIRED.DEACTIVATE:
            return {...initialState, loginRequired: false };
        default:
            return state;
    }
};

export default ModeReducer;
