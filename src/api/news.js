import api, { consoleErr } from ".";
import axios from "axios";

const NEWS_URL = {
    list: '/api/newsList'
}

export const getNewsList = async () => await api.get(NEWS_URL.list);

export const getNewsPost = async (id="") => {
    console.log('뉴스 포스트');

    const source = axios.CancelToken.source();
    // const url = `/newspost?id=${id}`;
    const url = 'data02/newspost.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
