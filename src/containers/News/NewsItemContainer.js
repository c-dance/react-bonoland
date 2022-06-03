import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Section from '../../components/ui/Section/Section';
import NewsCard from '../../components/News/NewsCard/NewsCard';
import { useNavigate } from 'react-router';

const NewsItemContainer = () => {

    const navigate = useNavigate();
    const onBackClick = () => { navigate(-1); };
    const onActionClick = () => { window.open(news.url); };

    const [ news, setNews ] = useState({});
    const { newsID } = useParams();

    const fetchNews = (params) => {
        fetch("/data/news.json")
            .then(res => res.json())
            .then(data => { setNews(data) })
            .catch(err => console.log(err));
    };

    

    useEffect(() => {
        fetchNews(newsID);
    }, []);

    return(
        <Section
            title={ "뉴스" }
            themeColor={ "secondary" }
            back = { true }
            onBackClick= { onBackClick }
            action={ true }
            actionText={ "출처 링크" }
            onActionClick={ onActionClick }
        >
            <NewsCard data={ news } />
        </Section>
    )
};

export default NewsItemContainer;