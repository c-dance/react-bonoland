import { MAP } from './types';

/* === MAP ACTIONS === */
export const updateMapProps = (value) => ({
    type: MAP.UPDATE_PROPS,
    payload: value
});
export const updateMapLatlng = (value) => ({
    type: MAP.UPDATE_LATLNG,
    payload: value
});
export const updateMapZoom = (value) => ({
    type: MAP.UPDATE_ZOOM,
    payload: value
});
export const updateMapRegion = (value) => ({
    type: MAP.UPDATE_REGION,
    payload: value
});

/* === USER ACTIONS === */
