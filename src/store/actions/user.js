import axios from "axios";

export const USER = {
    GEOLOACTAION: '/user/geo'
};

export const updateUserGeolocation = geo => ({
    type: USER.GEOLOACTAION,
    payload: geo
});
