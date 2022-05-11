import NewsItemComponent from '../../components/News/NewsItemComponent/NewsItemComponent';

const NewsItemContainer = ({ newsID }) => {

    const news = {};
    
    return (
        <NewsItemComponent news = { news } />
    )

};

export default NewsItemContainer;