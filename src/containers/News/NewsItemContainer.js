import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Section from '../../components/ui/Section/Section';
import NewsCard from '../../components/News/NewsCard/NewsCard';
import { useNavigate } from 'react-router';
import { getNewsPost } from '../../api/news';
import { useGet } from "../../hooks";

const NewsItemContainer = () => {

    const [ news, setNews ] = useState({});
    const [ newsUrl, setNewsUrl ] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();
    const [ loading, error, data, setGet ] = useGet({});

    
    useEffect(() => {
        setGet(getNewsPost(id));
    }, []);

    useEffect(() => {
        if(data.arrayResult) {
            setNews(data.arrayResult[0]);
            setNewsUrl(data.arrayResult[0].newsURL);
        }
    }, [data]);

    const onBackClick = () => { 
        navigate(-1); 
    };

    return(
        <Section
            title={ "뉴스" }
            themeColor={ "secondary" }
            back = { true }
            onBackClick= { onBackClick }
            action={ true }
            actionText={ "출처 링크" }
            onActionClick={ () => {window.open(newsUrl)} }
        >
            <NewsCard 
                news={ news } 
                loading={ loading }
                error={ error }  
            />
        </Section>
    )
};

export default NewsItemContainer;