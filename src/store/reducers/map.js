import { MAP } from '../actions/types';

const initialState = {
    geolocation: "geo",
    zoomLevel: 1
};

const MapReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case MAP.UPDATE_GEOLOCATION: 
            const geo = action.payload;
            return { ...state, geolocation: geo };
        case MAP.UPDATE_ZOOMLEVEL:
            const zoomLevel = action.payload;
            return { ...state, zoomLevel: zoomLevel };
        default: 
            return state;
    }
};

export default MapReducer;