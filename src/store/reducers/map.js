import { MAP } from '../actions/map';

const initialState = {
    latlng: [37.5036875, 126.7869375],
    zoom: 14,
    region: '경기도 부천시'
};

const MapReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case MAP.UPDATE_PROPS:
            const mapState = action.payload;
            return { ...mapState };
        case MAP.UPDATE_LATLNG: 
            const latlng = action.payload;
            return { ...state, latlng: latlng };
        case MAP.UPDATE_ZOOM:
            const zoom = action.payload;
            return { ...state, zoom: zoom };
        case MAP.UPDATE_REGION:
            const region = action.payload;
            return { ...state, region: region };
        default: 
            return state;
    }
};

export default MapReducer;