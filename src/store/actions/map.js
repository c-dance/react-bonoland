export const MAP = {
    UPDATE_INFOS: '/map/infos', // 위경도, 줌, 지역명
    CLEAR_MAP: '/map/clear', // 줌 바꿈
    UPDATE_FILTER: '/map/filter', // 지도 필터링
    ACTIVATE_CADASTRAL: '/map/cadastralOn', // 지적도 ON
    DEACTIVATE_CADASTRAL: '/map/cadastralOff', // 지적도 OFF
    UPDATE_MARKERS: '/map/markers', 
    UPDATE_INFOWINDOW: '/map/infowindow'
};

export const updateMapInfos = data => ({
    type: MAP.UPDATE_INFOS,
    payload: data
});

export const updateMapFilter = data => ({
    type: MAP.UPDATE_FILTER,
    payload: data
});

export const clearMapOverlay = () => ({
    type: MAP.CLEAR_MAP
});

export const updateMapMarkers = data => ({
    type: MAP.UPDATE_MARKERS,
    payload: data
});

export const updateMapInfoWindow = infoWindow => ({
    type: MAP.UPDATE_INFOWINDOW,
    payload: infoWindow
});

export const activateCadastral = () => ({
    type: MAP.ACTIVATE_CADASTRAL
});

export const deactivateCadastral = () => ({
    type: MAP.DEACTIVATE_CADASTRAL
});