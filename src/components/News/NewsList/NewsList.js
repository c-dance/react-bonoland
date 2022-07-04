import { List } from './NewsListStyle';
import { Card, Post } from '../NewsCard/NewsCardStyle.js'
import React, { useRef } from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';


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

const NewsList = ({ 
    news, 
    loading, 
    error,
    onCardClick,
    hasNextPage,
    isNextPageLoading, 
    loadNextpage,
 }) => {    

    // const ITEM_COUNT = hasNextPage? items.length + 1 : items.length;
    // const loadMoreItems = isNextPageLoading? () => {} : loadNextPage;
    // const isItemLoaded = index => !hasNextPage || index < items.length;

    return (
        <List>
            <div>
                { loading && Loading() }
                { error && Error() }
                { news && news.length < 1 && NoData('준비 중입니다.') }
                { news && news.length > 0 &&
                    newsSet.map((post, idx) => (
                        <div key={ idx }>
                            <Card onClick={ () => onCardClick(post["newsNo"]) }>
                                <Post>
                                    <h3>{ post.newsTitle }</h3>
                                    <p>{ post.newsContent }</p>
                                </Post>
                            </Card>
                            { idx < (newsSet.length) && <hr />}
                        </div>
                    ))
                }
            </div>
        </List>
    )
};

export default NewsList;