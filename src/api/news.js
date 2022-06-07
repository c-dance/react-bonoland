import api, { consoleErr } from ".";
import axios from "axios";

export const getNewsList = async () => {
    console.log('뉴스 목록');

    const source = axios.CancelToken.source();
    // const url = '/news';
    const url = '../../data02/news.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getNewsPost = async (id="") => {
    console.log('뉴스 포스트');

    const source = axios.CancelToken.source();
    // const url = `/newspost?id=${id}`;
    const url = '../../data02/newspost.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
