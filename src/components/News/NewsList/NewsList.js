import { List } from './NewsListStyle';
import { Card, Post } from '../NewsCard/NewsCardStyle.js'
import React, { useRef } from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';


const NewsList = ({ 
    items, 
    loading, 
    error,
    onCardClick,
    hasNextPage,
    isNextPageLoading, 
    loadNextPage,
 }) => {    

    console.log('items', items);
    const itemCount = hasNextPage ? items.length + 1 : items.length; // loading 할 칸을 만들기 위해서 정해 줌
    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage // nextPageLoading 중이면 load하지 않고, 로딩 중이지 않으면 load 함
    const isItemLoaded = index => !hasNextPage || index < items.length;

    const RENDER_ITEMS = ({ index, style }) => {
        let content;
        console.log(index);
        if (!isItemLoaded(index)) {
            console.log('loading');
            content = "Loading...";
        } else {
            // content = <Post>
            //     <h3>{ items[index].newsTitle }</h3>
            //     <p>{ items[index].newsContent }</p>
            // </Post>
            content="content";
        }

        return (
            <div style={style}>
                <Card>
                    {content}
                </Card>
                <hr />
            </div>
        );
    };

    return (
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
            <FixedSizeList
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
                height={100}
                width={'100%'}
                itemSize={100}
            >
            { RENDER_ITEMS }
            </FixedSizeList>
            )}
        </InfiniteLoader>
    );
    }

export default NewsList;