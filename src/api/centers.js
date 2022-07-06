import api, { consoleErr } from ".";
import axios from "axios";

const CENTERS_URL = {
    bono: '/rcmndBono',
    filter: '/searchAreaProc',
    category: '/sisul/totalNrsngHome'
};

/*  메인페이지 보노추천 목록  */
export const getBonoCenters = async option => await api.get(CENTERS_URL.bono, {
    params: option
}); 

/*  메인페이지 필터링 목록  */
export const getFilteredCenters = async filters => await api.post(CENTERS_URL.filter, filters);

/* 카테고리 목록 */
export const getCategoryCenters = async options => await api.post(CENTERS_URL.category, options);