import api from ".";

const CENTER_URL = {
    base: '/bono/detailPage', 
    calc: '/calculatorProc'
};

/*  일반 시설 상세페이지  */
export const getCenter = async option => await api.get(CENTER_URL.base, { params: option });

/*  일반 시설 수익계산 데이터  */
export const getCenterCalc = async option => await api.get(CENTER_URL.calc, { params: option });
