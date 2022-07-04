import api from ".";

const CENTER_URL = {
    base: '/bono/detailPage', 
};

/*  일반 시설 상세페이지  */
export const getCenter = async option => await api.get(CENTER_URL.base, {
    params: option
});
