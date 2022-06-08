import axios from "axios";

export const USER = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    SIGNUP: 'signup',
    UNSUBSCRIBE: 'user/unsubscribe',
    GET_USER: '/user',
    UPDATE_USER: 'update',
    GEOLOACTAION: '/user/geo'
};

export const updateUserGeolocation = geo => ({
    type: USER.GEOLOACTAION,
    payload: geo
});

