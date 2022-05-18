import { useState, useEffect } from 'react';
import NewsList from '../../components/News/NewsList/NewsList';
import SideSection from '../../components/SideSection/SideSection';

const NewsListContainer = () => {
    const [ newsList, setNewsList ] = useState([]);
    const clickClose = () => {
        console.log('close');
    }

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
        <SideSection
            title={ "뉴스" }
            themeColor={ "secondary" }
            close={ true }
            clickClose={ clickClose }
        >
            <NewsList 
                newsList = { newsList }   
            />
        </SideSection>
    )

};

export default NewsListContainer;