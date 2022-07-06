import api from '.';

const MAP_URL = {
    base: '/searchAreaMap'
};

/*  마커 데이터  */
export const getMapMarkers = async option => await api.post(MAP_URL.base, option);