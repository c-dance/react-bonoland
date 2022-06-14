import { GEOLOCATION } from '../actions/geolocation';

const initialState = {
    latlng: [],
};

const GeolocationReducer = (state=initialState, action) => {
    switch(action.type) {
        case GEOLOCATION :
            const LATLNG = action.payload;
            return {...state, latlng: LATLNG };
        default:
            return state;
    }
};

export default GeolocationReducer;