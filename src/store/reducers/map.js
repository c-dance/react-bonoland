import { MAP } from '../actions/map';
import { getZoomLevel, removeInfoWindow, removeMarkers } from '../../utils/map';

const initialState = {
    infos: {
        latlng: [37.5036875, 126.7869375],
        zoom: 14,
        region: '경기도 부천시', 
        category: '',
    },
    markers: [],
    infoWindow: null,
    filtered: false,
    cadastral: false,
};

const MapReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case MAP.UPDATE_INFOS:
            return {...state, infos: {...state.infos,...action.payload}}
        case MAP.UPDATE_LATLNG: 
            const latlng = action.payload;
            return { ...state, latlng: latlng };
        case MAP.UPDATE_ZOOM:
            const zoom = action.payload;
            return { ...state, zoom: zoom };
        case MAP.UPDATE_REGION:
            const region = action.payload;
            return { ...state, region: region };
        case MAP.UPDATE_MARKERS:
            const markers = action.payload;
            return { ...state, markers: markers };
        case MAP.UPDATE_INFOWINDOW:
            const infoWindow = action.payload;
            return { ...state, infoWindow: infoWindow };
        case MAP.UPDATE_FILTER:
            const filterProps = action.payload;
            filterProps.filtered = !state.filtered;
            return Object.assign({}, state, filterProps);
        case MAP.ACTIVATE_CADASTRAL: 
            return {...state, cadastral: true };
        case MAP.DEACTIVATE_CADASTRAL: 
            return {...state, cadastral: false };
        default: 
            return state;
    }
};

export default MapReducer;