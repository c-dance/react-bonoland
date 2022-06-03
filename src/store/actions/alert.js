export const ALERT = {
    ACTIVATE: '/alert',
    DEACTIVATE: '/'
};

export const activateAlert = message => ({
    type: ALERT.ACTIVATE,
    payload: message
});

export const deactivateAlert = () => ({
    type: ALERT.DEACTIVATE,
    payload: ''
});