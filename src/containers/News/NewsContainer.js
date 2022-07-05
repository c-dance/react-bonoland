import React, { useState, useEffect } from 'react';
import NewsList from '../../components/News/NewsList/NewsList';
import Section from '../../components/ui/Section/Section';
import { getNewsList, getNewsPost } from '../../api/news';
import { useGet } from "../../hooks";
import { isBrowser, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux/es/exports';
import { deactivateNews } from '../../store/actions/page';
import NewsCard from '../../components/News/NewsCard/NewsCard';

const newsSet = [
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
    {
        newsNo: 1, 
        newsTitle: '뉴스 타이틀 테스트',
        newsContent: '뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트 뉴스 컨텐츠 테스트'
    },
]

const NewsContainer = () => {

    const dispatch = useDispatch();

    const [ newsList, setNewsList ] = useState([]);
    const [ post, setPost ] = useState(null);

    const [ listPage, setListPage ] = useState(0);
    const [ listLoading, listError, listData, setListGet ] = useGet([]);
    const [ postLoading, postError, postData, setPostGet ] = useGet({});

    const [ sectionProps, setSectionProps ] = useState({});

    /* === infinite loading === */
    const [ hasNextPage, setHasNextPage ] = useState(true);
    const [ isNextPageLoading, setIsNextPageLoading ] = useState(false);
    const loadNextPage = () => {
        console.log('load more please');
        setIsNextPageLoading(true);
        setTimeout(function(){
            setIsNextPageLoading(false);
            setNewsList(newsList => newsList.concat(newsSet.slice(0, 5)));
            setHasNextPage(true);
        }, 2000);
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
        // setListGet(getNewsList);
    }, []);
    
    useEffect(() => {
        if(listData && listData.arrayResult) {
            // setNewsList(listData.arrayResult);
            // setNewsList(listData => listData.concat(listData.arrayResult));
            // setNewsList(newsList => newsList.concat(newsSet.slice(0, 5)));
            // setListPage(listPage => listPage + 1);
        }
    }, [listData]);

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
                        loading={ listLoading }
                        error={ listError } 
                        onCardClick={ onCardClick } 
                        hasNextPage={ hasNextPage }
                        isNextPageLoading={ isNextPageLoading }
                        loadNextPage={ loadNextPage }
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