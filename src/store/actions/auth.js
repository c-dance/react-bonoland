export const AUTH = {
    PHONE_NUMBER: '/auth/phoneNumber',
    SUCCESS: '/auth/success'
};

export const updatePhoneNumber = phoneNumber => ({
    type: AUTH.PHONE_NUMBER,
    payload: phoneNumber
});

export const updateAuthState = state => ({
    type: AUTH.SUCCESS,
    payload: state
});