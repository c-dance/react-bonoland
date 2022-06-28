import { MAP } from '../actions/map';
import { removeInfoWindow, removeMarkers } from '../../utils/map';

const initialState = {
    infos: {
        latlng: [37.5036875, 126.7869375],
        zoom: 14,
        region: '경기도 부천시', 
        category: null,
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
        case MAP.UPDATE_MARKERS:
            if(state.infoWindow) removeInfoWindow(state.infoWindow);
            if(state.markers.length > 0) removeMarkers(state.markers);
            const markers = action.payload;
            return { ...state, markers: markers };
        case MAP.UPDATE_INFOWINDOW:
            if(state.infoWindow) removeInfoWindow(state.infoWindow);
            const infoWindow = action.payload;
            return { ...state, infoWindow: infoWindow };
        case MAP.CLEAR_MAP:
            removeInfoWindow(state.infoWindow);
            removeMarkers(state.markers);
            return { ...state, markers: [], infoWindow: null };
        case MAP.ACTIVATE_CADASTRAL: 
            return {...state, cadastral: true };
        case MAP.DEACTIVATE_CADASTRAL: 
            return {...state, cadastral: false };
        default: 
            return state;
    }
};

export default MapReducer;