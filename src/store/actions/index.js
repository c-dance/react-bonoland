import { MAP } from './types';

/* === MAP ACTIONS === */
export const updateMapGeolocation = (value) => ({
    type: MAP.UPDATE_GEOLOCATION,
    payload: value
});

export const updateMapZoomLevel = (value) => ({
    type: MAP.UPDATE_ZOOMLEVEL,
    payload: value
});

/* === USER ACTIONS === */
