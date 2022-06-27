import { MAP } from './types';
import { MODAL } from './types';

/* === MAP ACTIONS === */
export const updateMapInfos = (value) => ({
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

/* === MODAL ACTIONS === */
export const activateModal = (name) => ({
    type: MODAL.ACTIVATE_MODAL,
    payload: name
});

export const deativateModal = () => ({
    type: MODAL.DEACTIVATE_MODAL
});
