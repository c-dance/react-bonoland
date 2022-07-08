import api from ".";

const NEWS_URL = {
    list: '/api/newsList', 
    post: 'api/newsListDetail'
}

export const getNewsList = async option => await api.get(NEWS_URL.list, { params: option });

// export const getNewsPost = async newsNo => await api.get(NEWS_URL.post + `?newsNo=${newsNo}`);
export const getNewsPost = async newsNo => await api.post(NEWS_URL.post, {
    newsNo: newsNo
});
