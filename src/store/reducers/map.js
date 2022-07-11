import { MAP } from '../actions/map';
import { removeInfoWindow, removeMarkers, removeDataLayer, renderDataLayer } from '../../utils/map';

const initialState = {
    infos: {
        latlng: [37.5036875, 126.7869375],
        zoom: 14,
        region: '경기도 부천시', 
        category: null,
        category2: null,
    },
    filter: {
        latlng: [37.5036875, 126.7869375],
        zoom: 14,
        region: '경기도 부천시', 
        geoAddress: '',
        category: null,
        category2: null,
    },
    map: null,
    markers: [],
    infoWindow: null,
    dataLayer: null,
    cadastral: false,
};

const MapReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case MAP.INIT_MAP: 
            return {...state, map: action.payload};
        case MAP.UPDATE_INFOS:
            return {...state, infos: {...state.infos,...action.payload}}
        case MAP.UPDATE_FILTER:
            return {...state, filter: {...state.filter,...action.payload}}
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
            if(state.dataLayer) removeDataLayer(state.map);
            removeInfoWindow(state.infoWindow);
            removeMarkers(state.markers);
            return { ...state, markers: [], infoWindow: null };
        case MAP.UPDATE_DATA_LAYER: 
            const dataLayer = renderDataLayer(state.map, action.payload);
            return {...state, dataLayer: dataLayer, filter: {...state.filter, geoAddress: '' } };
        case MAP.CLEAR_DATA_LAYER: 
            removeDataLayer(state.map);
            return {...state, dataLayer: null };
        case MAP.ACTIVATE_CADASTRAL: 
            return {...state, cadastral: true };
        case MAP.DEACTIVATE_CADASTRAL: 
            return {...state, cadastral: false };
        default: 
            return state;
    }
};

export default MapReducer;