import api from ".";

const NEWS_URL = {
    list: '/api/newsList', 
    post: 'api/newsListDetail'
}

export const getNewsList = async () => await api.get(NEWS_URL.list);

// export const getNewsPost = async newsNo => await api.get(NEWS_URL.post + `?newsNo=${newsNo}`);
export const getNewsPost = async newsNo => await api.get(NEWS_URL.post, {
    params: {
        newsNo: newsNo
    }
});
