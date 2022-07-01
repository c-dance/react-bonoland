import { SERVICE } from '../actions/service';

const initialState = {
    signup: false,
    login: false,
    findId: false,
    findPwd: false,
    calculator: false, 
    contact: false,
    alarm: false,
    loginRequired: false,
    registser: false,
    calculatorData: null,
    contactData: null
};

const ServiceReducer = (state = initialState, action ) => {
    switch(action.type) {
        case SERVICE.SIGNUP_ON: 
            return {...initialState, signup: true };
        case SERVICE.SIGNUP_OFF:
            return {...initialState, signup: false };
        case SERVICE.LOGIN_ON: 
            return {...initialState, login: true };
        case SERVICE.LOGIN_OFF:
            return {...initialState, login: false };
        case SERVICE.FIND_ID_ON: 
            return {...initialState, findId: true };
        case SERVICE.FIND_ID_OFF:
            return {...initialState, findId: false };
        case SERVICE.FIND_PWD_ON: 
            return {...initialState, findPwd: true };
        case SERVICE.FIND_PWD_OFF:
            return {...initialState, findPwd: false };
        case SERVICE.CALCULATOR_ON: 
            return {...initialState, calculator: true, calculatorData: action.payload };
        case SERVICE.CALCULATOR_OFF:
            return {...initialState, calculator: false, calculatorData: null };
        case SERVICE.CALCULATOR_RESET:
            return {...state, calculatorData: action.payload };
        case SERVICE.CONTACT_ON: 
            return {...initialState, contact: true, contactData: action.payload };
        case SERVICE.CONTACT_OFF:
            return {...initialState, contact: false, contactData: null };
        case SERVICE.ALARM_ON: 
            return {...initialState, alarm: true };
        case SERVICE.ALARM_OFF:
            return {...initialState, alarm: false };
        case SERVICE.REGISTER_ON: 
            return {...initialState, register: true };
        case SERVICE.REGISTER_OFF:
            return {...initialState, register: false };
        case SERVICE.LOGIN_REQUIRED_ON: 
            return {...initialState, loginRequired: true };
        case SERVICE.LOGIN_REQUIRED_OFF:
            return {...initialState, loginRequired: false };
        default:
            return state;
    }
};

export default ServiceReducer;
