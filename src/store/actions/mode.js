/* === ACTION TYPE === */
export const SIGNUP  = {
    ACTIVATE: '/signup/on',
    DEACTIVATE: '/signup/off'
};

export const LOGIN = {
    ACTIVATE: '/login/on',
    DEACTIVATE: '/login/off'
};

export const FIND_ID = {
    ACTIVATE: '/findId/on',
    DEACTIVATE: '/findId/off'
};

export const FIND_PWD = {
    ACTIVATE: '/findPwd/on',
    DEACTIVATE: '/findPwd/off'
};

export const CALCULATOR = {
    ACTIVATE: '/calculator/on',
    DEACTIVATE: '/calculator/off',
    RESET: '/calculator/reset'
};

export const CONTACT = {
    ACTIVATE: '/contact/on',
    DEACTIVATE: '/contact/off', 
};

export const ALARM = {
    ACTIVATE: '/alarm/on',
    DEACTIVATE: '/alarm/off', 
};

export const LOGIN_REQUIRED = {
    ACTIVATE: '/loginRequired/on',
    DEACTIVATE: '/loginRequired/off'
}

/* === ACTOIN CREATOR === */
export const activateSignup = () => ({
    type: SIGNUP.ACTIVATE,
});

export const activateLogin = () => ({
    type: LOGIN.ACTIVATE,
});

export const activateFindId = () => ({
    type: FIND_ID.ACTIVATE,
});

export const activateFindPwd = () => ({
    type: FIND_PWD.ACTIVATE,
});

export const activateCalculator = (data = null) => ({
    type: CALCULATOR.ACTIVATE,
    payload: data
});

export const activateContact = (data = null) => ({
    type: CONTACT.ACTIVATE,
    payload: data
});

export const activateAlarm = () => ({
    type: ALARM.ACTIVATE,
});

export const activateLoginRequired = () => ({
    type: LOGIN_REQUIRED.ACTIVATE,
});

export const deactivateSignup = () => ({
    type: SIGNUP.DEACTIVATE,
});

export const deactivateLogin = () => ({
    type: LOGIN.DEACTIVATE,
});

export const deactivateFindId = () => ({
    type: FIND_ID.DEACTIVATE,
});

export const deactivateFindPwd = () => ({
    type: FIND_PWD.DEACTIVATE,
});

export const deactivateCalculator = () => ({
    type: CALCULATOR.DEACTIVATE,
});

export const deactivateContact = () => ({
    type: CONTACT.DEACTIVATE,
});

export const deactivateAlarm = () => ({
    type: ALARM.DEACTIVATE,
});

export const deactivateLoginRequired = () => ({
    type: LOGIN_REQUIRED.DEACTIVATE,
});

export const resetCalculator = (data = null) => ({
    type: CALCULATOR.RESET,
    payload: data
});

