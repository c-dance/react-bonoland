import { List as NewsListWrap } from './NewsListStyle';
import { Card, Post } from '../NewsCard/NewsCardStyle.js'
import React, { useRef } from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';
import { AutoSizer, InfiniteLoader, List, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';



const NewsList = ({ 
    items, 
    onCardClick,
    hasNext,
    isNextLoading, 
    loadNext,
 }) => {    

    console.log(items);

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 60
    });

    const isRowLoaded = ({index}) => {
        console.log(index);
        if(!hasNext) return true;
        else return !!items[index];
    };

    const rowRenderer = ({key, index, style, parent}) => (
    <CellMeasurer
        key={ key }
        cache={ cache }
        parent={ parent }
        columnIndex={ 0 }
        rowIndex={ index }
      >
        <div style={ style }>
            {
                index < items.length &&
                <>
                    <Card onClick={ () => onCardClick(items[index].newsNo) }>
                        <Post>
                            <h3>{ items[index].newsTitle }</h3>
                            <p>{ items[index].newsContent }</p>
                        </Post>
                    </Card>
                    <hr />
                </>
            }
            { index === items.length && hasNext && <span>loading...</span>  }
            { index === items.length && !hasNext && <span>end</span>  }
        </div>
      </CellMeasurer>
    );

    const loadMoreRows = isNextLoading? () => {} : loadNext;

    return (
        <NewsListWrap>

        <InfiniteLoader
        isRowLoaded={ isRowLoaded }
        loadMoreRows={ loadMoreRows }
        rowCount={ items.length + 1}  
        >
        {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
            {
                ({height, isScrolling, scrollTop}) => (
                <AutoSizer>
                {({width}) => (
                    <List
                        className='list'
                        width={ width }
                        height={ height }
                        deferredMeasurementCache={ cache }
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={ items.length + 1}
                        rowHeight={ cache.rowHeight }
                        rowRenderer={rowRenderer}
                        style={{height: 'auto'}}
                    />
                    )}
                </AutoSizer>
                )
            }
            </WindowScroller>
        )}
    </InfiniteLoader>
        </NewsListWrap>
    );
}

export default NewsList;