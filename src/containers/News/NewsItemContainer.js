import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Section from '../../components/ui/Section/Section';
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
        <Section
            title={ "뉴스" }
            themeColor={ "secondary" }
            back = { true }
            onBackClick= { backToList }
            action={ true }
            actionText={ "출처 링크" }
            onActionClick={ openNews }
        >
            <NewsCard data={ news } />
        </Section>
    )
};

export default NewsItemContainer;