export const MAP = {
    UPDATE_INFOS: 'map/infos',
    UPDATE_LATLNG : 'map/latlng', // 필수 - 위도, 경도
    UPDATE_ZOOM : 'map/zoom', // 필수 - 줌
    UPDATE_REGION: 'map/region', // 필수 - 지역명(지역명박스)
    ACTIVATE_CADASTRAL: 'map/cadastralOn', // 필수 - 지적도 ON
    DEACTIVATE_CADASTRAL: 'map/cadastralOff', // 필수 - 지적도 OFF
    UPDATE_MARKERS: 'map/markers', 
    UPDATE_INFOWINDOW: 'map/infowindow',
    UPDATE_FILTER: 'map/filter'
};

export const updateMapInfos = value => ({
    type: MAP.UPDATE_INFOS,
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

export const updateMapInfoWindow = (value) => ({
    type: MAP.UPDATE_INFOWINDOW,
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