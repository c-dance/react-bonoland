import { USER } from '../actions/user';

const initialState = {
    geolocation: [],
};

const UserReducer = (state=initialState, action) => {
    switch(action.type) {
        case USER.GEOLOACTAION :
            const GEO = action.payload;
            return {...state, geolocation: GEO };
        default:
            return state;
    }
};

export default UserReducer;