import api from ".";

const CENTER_URL = {
    center: '/bono/detailPage', 
    sales: ''
};

/*  일반 시설 상세페이지  */
export const getCenter = async data => await api.post(CENTER_URL.center, {
    userNo : 25,
    longTermAdminSym : 2,
});

/*  매물 상세페이지  */
export const getSalesItem = async data => await api.post(CENTER_URL.sales, {
    userNo: data.userNo
});

// export const getCenter = async (id = "") => {

//     const source = axios.CancelToken.source();
//     const url = 'http://localhost:3500/data02/center.json';

//     try {
//         const response = await api.get(url , { cancelToken: source.token });
//         return response;
//     } catch (err) {
//         consoleErr(err);
//     } finally {
//         source.cancel();
//     }
// };
