import { MAP } from '../actions/map';
import { getZoomLevel, removeInfoWindow, removeMarkers, renderedGroupMarker, renderItemMarkers, renderInfoWindow } from '../../utils/map';
import { act } from 'react-dom/test-utils';

const initialState = {
    infos: {
        latlng: [37.5036875, 126.7869375],
        zoom: 14,
        region: '경기도 부천시', 
        category: '',
    },
    eventTime: '',
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
            const markers = action.payload;
            return { ...state, markers: markers };
        case MAP.UPDATE_INFOWINDOW:
            const infoWindow = action.payload;
            return { ...state, infoWindow: infoWindow };
        case MAP.UPDATE_EVENT:
            removeInfoWindow(state.infoWindow);
            removeMarkers(state.markers);
            const eventTime = new Date();
            return { ...state, eventTime: eventTime };
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