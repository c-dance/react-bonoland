import React, { useState, useEffect } from 'react';
import NewsList from '../../components/News/NewsList/NewsList';
import Section from '../../components/ui/Section/Section';
import { useNavigate } from 'react-router';

const NewsListContainer = () => {
    const navigate = useNavigate();
    const onCloseClick = () => { navigate('/'); }

    const [ newsList, setNewsList ] = useState([]);


    const fetchNewsList = () => {
        fetch('/data/newsList.json')
            .then(res => res.json())
            .then(data => setNewsList(data))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        fetchNewsList();
    }, []);
    
    return (
        <Section
            title={ "뉴스" }
            themeColor={ "secondary" }
            close={ true }
            onCloseClick={ onCloseClick }
        >
            <NewsList 
                datas = { newsList }   
            />
        </Section>
    )

};

export default NewsListContainer;