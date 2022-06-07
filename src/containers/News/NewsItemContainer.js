import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Section from '../../components/ui/Section/Section';
import NewsCard from '../../components/News/NewsCard/NewsCard';
import { useNavigate } from 'react-router';
import { getNewsPost } from '../../api/news';
import { useGet } from "../../hooks";

const NewsItemContainer = () => {

    const [ news, setNews ] = useState({});
    const { newsID } = useParams();

    const navigate = useNavigate();
    const [ loading, error, noData, data, setGet ] = useGet({});


    useEffect(() => {
        setGet({
            get: getNewsPost,
            params: newsID
        })
    }, []);

    useEffect(() => {
        // setNews(data);
        if(Object.keys(data).length > 0) {
            setNews(data[Object.keys(data)[0]]);
        }
    }, [data]);

    const onBackClick = () => { 
        navigate(-1); 
    };
    const openPostSource = () => {
        window.open(news.url);
    };


    return(
        <Section
            title={ "뉴스" }
            themeColor={ "secondary" }
            back = { true }
            onBackClick= { onBackClick }
            action={ true }
            actionText={ "출처 링크" }
            onActionClick={ openPostSource }
        >
            <NewsCard 
                news={ news } 
                loading={ loading }
                error={ error }  
                noData={ noData }
            />
        </Section>
    )
};

export default NewsItemContainer;