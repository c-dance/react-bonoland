import api, { consoleErr } from ".";
import axios from "axios";


export const getCenter = async (id = "") => {
    console.log('기관');

    const source = axios.CancelToken.source();
    // const url = '/center';
    const url = 'http://localhost:3500/data02/center.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
