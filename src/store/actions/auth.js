import axios from 'axios';
// export const AUTH_USER =  'AUTH_USER';

// export const signup = formDatas => dispatch => {
//     axios.post('/data/signup.json', formDatas);
// };

export const AUTH = {
    ADD: 'auth/phonenumber',
    UPDATE: 'auth/authentificated',
    DELETE: 'auth/delete'
};

export const addAuth = phoneNumber => ({
    type: AUTH.ADD,
    payload: phoneNumber
});

export const updateAuth = authentificated => ({
    type: AUTH.UPDATE,
    payload: authentificated
});

export const deleteAuth = () => ({
    type: AUTH.DELETE,
    payload: null
});
