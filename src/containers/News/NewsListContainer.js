import React, { useState, useEffect } from 'react';
import NewsList from '../../components/News/NewsList/NewsList';
import Section from '../../components/ui/Section/Section';
import { useNavigate } from 'react-router';
import { getNewsList } from '../../api/news';
import { useGet } from "../../hooks";

const NewsListContainer = () => {

    const navigate = useNavigate();
    const onCloseClick = () => { navigate('/'); }

    const [ newsList, setNewsList ] = useState([]);
    const [ loading, error, noData, data, setGet ] = useGet({});



    useEffect(() => {
        setGet({
            get: getNewsList
        })
    }, []);

    useEffect(() => {
        // setNewsList(data);
        if(Object.keys(data).length > 0) {
            setNewsList(data[Object.keys(data)[0]]);
        }
    }, [data]);
    
    return (
        <Section
            title={ "뉴스" }
            themeColor={ "secondary" }
            close={ true }
            onCloseClick={ onCloseClick }
        >
            <NewsList 
                news = { newsList } 
                loading={ loading }
                error={ error }  
                noData={ noData }  
            />
        </Section>
    )

};

export default NewsListContainer;