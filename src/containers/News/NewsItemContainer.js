import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SideSection from '../../components/SideSection/SideSection';
import NewsCard from '../../components/News/NewsCard/NewsCard';

const NewsItemContainer = () => {

    const [ news, setNews ] = useState({});
    const { newsID } = useParams();

    const fetchNews = (params) => {
        fetch("/data/news.json")
            .then(res => res.json())
            .then(data => { setNews(data) })
            .catch(err => console.log(err));
    };

    const openNews = () => {
        window.open(news.url);
    };
    
    const backToList = () => {
        window.history.back();
    };

    useEffect(() => {
        fetchNews(newsID);
    }, []);

    return(
        <SideSection
            title={ "뉴스" }
            themeColor={ "secondary" }
            back = { true }
            clickBack= { backToList }
            action={ true }
            actionText={ "출처 링크" }
            clickAction={ openNews }
        >
            <NewsCard data={ news } />
        </SideSection>
    )
};

export default NewsItemContainer;