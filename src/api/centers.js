import api, { consoleErr } from ".";
import axios from "axios";

const CENTERS_URL = {
    bono: '/rcmndBono',
    recommend: {
        business: '/', 
        remodeling: '/'
    },
    sales: {
        nursing: '/bono/totalSale',
        daycare: '/'
    }
};

/*  메인페이지 보노추천 목록  */
export const getBonoCenters = async () => await api.get(CENTERS_URL.bono); 

/*  신규 사업지 목록  */
export const getBusinessCenters = async data => await api.post(CENTERS_URL.recommend.business, {

});

/*  신규 리모델링 목록  */
export const getRemodelingCenters = async data => await api.post(CENTERS_URL.recommend.business, {

});

/*  신규 요양원 목록  */
export const getNursingCenters = async data => await api.post(CENTERS_URL.recommend.business, {

});

/*  신규 주간보호 목록  */
export const getDaycareCenters = async data => await api.post(CENTERS_URL.recommend.business, {

});




// export const getFilteredCenters = async (filter = { category: "", capacity: [] }) => {
//     console.log('필터링 목록');

//     const source = axios.CancelToken.source();
//     const url = `/centers?category=${filter.category}?capacity=${filter.capacity}`;

//     try {
//         const response = await api.get("http://localhost:3500/centers" , { cancelToken: source.token });
//         return response;
//     } catch (err) {
//         consoleErr(err);
//     } finally {
//         source.cancel();
//     }
// };

export const getAllRecommendCenters = async (region=null) => {
    console.log('메인 추천 목록');

    const source = axios.CancelToken.source();
    // const url = '/allrecommends';
    const url = 'data02/allrecommends.json';

    try {
        const response = await api.get("http://localhost:3500/centers", { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getRecommendCenters = async (region=null) => {
    console.log('추천 목록');

    const source = axios.CancelToken.source();
    // const url = '/recommends';
    const url = 'data02/recommends.json';

    try {
        const response = await api.get("http://localhost:3500/recommends", { cancelToken: source.token });
        console.log(response);
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getSalesCenters = async (region=null) => {
    console.log('매매 목록');

    const source = axios.CancelToken.source();
    // const url = '/sales';
    const url = 'data02/sales.json';

    try {
        const response = await api.get("http://localhost:3500/sales", { cancelToken: source.token });
        console.log(response);
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
