export const MAP = {
    UPDATE_PROPS: 'map/',
    UPDATE_LATLNG : 'map/latlng',
    UPDATE_ZOOM : 'map/zoom',
    UPDATE_REGION: 'map/region',
    UPDATE_MARKERS: 'map/markers',
    UPDATE_FILTER: 'map/filter',
    ACTIVATE_CADASTRAL: 'map/cadastralOn',
    DEACTIVATE_CADASTRAL: 'map/cadastralOff'
};

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

export const updateMapMarkers = (value) => ({
    type: MAP.UPDATE_MARKERS,
    payload: value
});

export const updateMapFilter = (value) => ({
    type: MAP.UPDATE_FILTER,
    payload: value
});

export const activateCadastral = () => ({
    type: MAP.ACTIVATE_CADASTRAL
});

export const deactivateCadastral = () => ({
    type: MAP.DEACTIVATE_CADASTRAL
});