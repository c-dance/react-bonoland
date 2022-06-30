import api from '.';

const MAP_URL = {
    base: '/searchAreaProc'
};

/*  마커 데이터  */
export const getMapMarkers = async map => await api.post(MAP_URL.base, {
    x: map.latlng[0],
    y: map.latlng[1],
    zoom: map.zoom,
    categories: map.categories
});