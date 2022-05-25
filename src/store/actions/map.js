export const MAP = {
    UPDATE_PROPS: 'map/',
    UPDATE_LATLNG : 'map/latlng',
    UPDATE_ZOOM : 'map/zoom',
    UPDATE_REGION: 'map/region'
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