/* === ACTION TYPE === */
export const SERVICE = {
    SIGNUP_ON: '/signup/on',
    SIGNUP_OFF: '/signup/off',
    LOGIN_ON: '/login/on',
    LOGIN_OFF: '/login/off',
    FIND_ID_ON: '/findId/on',
    FIND_ID_OFF: '/findId/off',
    FIND_PWD_ON: '/findPwd/on',
    FIND_PWD_OFF: '/findPwd/off',
    CALCULATOR_ON: '/calculator/on',
    CALCULATOR_OFF: '/calculator/off',
    CALCULATOR_RESET: '/calculator/reset',
    CONTACT_ON: '/contact/on',
    CONTACT_OFF: '/contact/off',
    REGISTER_ON: '/register/on',
    REGISTER_OFF: '/register/off', 
    LOGIN_REQUIRED_ON: '/loginRequired/on',
    LOGIN_REQUIRED_OFF: '/loginRequired/off'
}

export const activateSignup = () => ({ type: SERVICE.SIGNUP_ON });
export const activateLogin = () => ({ type: SERVICE.LOGIN_ON });
export const activateFindId = () => ({ type: SERVICE.FIND_ID_ON });
export const activateFindPwd = () => ({ type: SERVICE.FIND_PWD_ON });
export const activateRegister = () => ({ type: SERVICE.REGISTER_ON });
export const activateLoginRequired = () => ({ type: SERVICE.LOGIN_REQUIRED_ON });
export const activateCalculator = (data = null) => ({
    type: SERVICE.CALCULATOR_ON,
    payload: data
});
export const activateContact = (data = null) => ({
    type: SERVICE.CONTACT_ON,
    payload: data
});

export const deactivateSignup = () => ({ type: SERVICE.SIGNUP_OFF });
export const deactivateLogin = () => ({ type: SERVICE.LOGIN_OFF });
export const deactivateFindId = () => ({ type: SERVICE.FIND_ID_OFF });
export const deactivateFindPwd = () => ({ type: SERVICE.FIND_PWD_OFF });
export const deactivateCalculator = () => ({ type: SERVICE.CALCULATOR_OFF });
export const deactivateContact = () => ({ type: SERVICE.CONTACT_OFF });
export const deactivateRegister = () => ({ type: SERVICE.REGISTER_OFF });
export const deactivateLoginRequired = () => ({ type: SERVICE.LOGIN_REQUIRED_OFF });
export const resetCalculator = (data = null) => ({
    type: SERVICE.CALCULATOR_RESET,
    payload: data
});

