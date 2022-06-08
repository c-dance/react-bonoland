import api, { consoleErr } from ".";
import axios from "axios";


export const getMapChart = async (region="") => {
    console.log('지도 차트');

    const source = axios.CancelToken.source();
    // const url = '/mapchart';
    const url = 'data02/mapchart.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
