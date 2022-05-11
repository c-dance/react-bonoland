import NewsListComponent from '../../components/News/NewsListComponent/NewsListComponet';

const NewsListContainer = () => {
    const newsList = [];
    
    return (
        <NewsListComponent newsList = { newsList } />
    )

};

export default NewsListContainer;