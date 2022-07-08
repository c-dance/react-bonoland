import React, { useState, useEffect } from 'react';
import NewsList from '../../components/News/NewsList/NewsList';
import Section from '../../components/ui/Section/Section';
import { getNewsList, getNewsPost } from '../../api/news';
import { useGet } from "../../hooks";
import { isBrowser, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux/es/exports';
import { deactivateNews } from '../../store/actions/page';
import NewsCard from '../../components/News/NewsCard/NewsCard';

const NewsContainer = () => {

    const dispatch = useDispatch();

    const [ newsList, setNewsList ] = useState([]);
    const [ post, setPost ] = useState(null);

    
    const [ postLoading, postError, postData, setPostGet ] = useGet({});

    const [ sectionProps, setSectionProps ] = useState({});

    /* === infinite loading === */
    const [ nextIndex, setNextIndex ] = useState(1);
    const [ hasNext, setHasNext ] = useState(false);
    const [ isNextLoading, setIsNextLoading ] = useState(false);

    const loadNext = async () => {
        setIsNextLoading(false);
        const RESPONSE = await getNewsList({ page: nextIndex });
        if(RESPONSE && RESPONSE.data) {
            setNewsList([... newsList, ...RESPONSE.data.arrayResult]);
            setHasNext(RESPONSE.data.pageCode === 1);
        }
        setNextIndex(nextIndex => nextIndex + 1);
        setIsNextLoading(false);
    };

    const loadInitial = async () => {
        setIsNextLoading(true);
        const RESPONSE = await getNewsList({ page: 1});
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data)  {
            setNewsList(RESPONSE.data.arrayResult);
            setHasNext(RESPONSE.data.pageCode === 1);
        }
        setNextIndex(2);
        setIsNextLoading(false);
    };

    const onCardClick = postNo => { 
        setPostGet(getNewsPost(postNo));
    };

    const onPostCloseClick = () => { 
        setPost(null); 
        setSectionProps(listSectionProps);
    }

    useEffect(() => {
        setSectionProps(listSectionProps);
        loadInitial();
        // setListGet(getNewsList);
    }, []);

    useEffect(() => {
        if(postData.arrayResult) {
            setPost(postData.arrayResult[0]);
            setSectionProps(postSectionProps(postData.arrayResult[0].newsURL));
        }
    }, [postData]);

    const listSectionProps = {
        title: "뉴스",
        themeColor: "secondary",
        close: isBrowser? true : false,
        back: isMobile? true: false,
        onCloseClick: () => dispatch(deactivateNews()),
        onBackClick: () => dispatch(deactivateNews())
    };

    const postSectionProps = (url) => ({
        title: "뉴스",
        themeColor: "secondary",
        back: true,
        onBackClick: onPostCloseClick,
        action: true,
        actionText: "출처 링크",
        onActionClick: () => {window.open(url)} 
    });
    
    return (
        <>
            <Section {...sectionProps}>
                {
                    !post &&
                    <NewsList 
                        items = { newsList } 
                        onCardClick={ onCardClick } 
                        hasNext={ hasNext }
                        isNextLoading={ isNextLoading }
                        loadNext={ loadNext } 
                    />
                }
                {
                    post && 
                    <NewsCard 
                        news={ post } 
                        loading={ postLoading }
                        error={ postError }  
                    />
                }
            </Section>
        </>
    )

};

export default NewsContainer;