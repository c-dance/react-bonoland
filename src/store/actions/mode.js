/* === ACTION TYPE === */
export const SIGNUP  = {
    ACTIVATE: '/signup',
    DEACTIVATE: '/'
};

export const LOGIN = {
    ACTIVATE: '/login',
    DEACTIVATE: '/'
};

export const FIND_ID = {
    ACTIVATE: '/findId',
    DEACTIVATE: '/'
};

export const FIND_PWD = {
    ACTIVATE: '/findPwd',
    DEACTIVATE: '/'
};

export const CALCULATOR = {
    ACTIVATE: '/calculator',
    DEACTIVATE: '/'
};

/* === ACTOIN CREATOR === */
export const activateSignup = () => ({
    type: SIGNUP.ACTIVATE,
    payload: true
});

export const activateLogin = () => ({
    type: LOGIN.ACTIVATE,
    payload: true
});

export const activateFindId = () => ({
    type: FIND_ID.ACTIVATE,
    payload: true
});

export const activateFindPwd = () => ({
    type: FIND_PWD.ACTIVATE,
    payload: true
});

export const activateCalculator = () => ({
    type: CALCULATOR.ACTIVATE,
    payload: true
});

export const deactivateSignup = () => ({
    type: SIGNUP.DEACTIVATE,
    payload: false
});

export const deactivateLogin = () => ({
    type: LOGIN.DEACTIVATE,
    payload: false
});

export const deactivateFindId = () => ({
    type: FIND_ID.DEACTIVATE,
    payload: false
});

export const deactivateFindPwd = () => ({
    type: FIND_PWD.DEACTIVATE,
    payload: false
});

export const deactivateCalculator = () => ({
    type: CALCULATOR.DEACTIVATE,
    payload: false
});