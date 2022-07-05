import React from "react";
import { CardList, CardDivider, ListWrap } from './CenterListStyle';
import CenterCard from "../CenterCard/CenterCard";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';
import { AutoSizer, InfiniteLoader, List, WindowScroller } from 'react-virtualized';

const CenterList = ({
    list,
    type, 
    centers,
    loading,
    error,
    hasNextPage,
    isNextPageLoading,
    loadNextPage
}) => {
    console.log(centers);

    const rowRenderer = ({ key, index, style}) => {
        return (
          <div
            key={key}
            index={index}
            style={style}
          >
            <CenterCard list={list} type={ type } center = { centers[index] } />
            <CardDivider />
          </div>
        );
      };

    const isRowLoaded = ({ index }) => !!centers[index];
    
    const loadMoreRows = (isNextPageLoading || !hasNextPage)? () => {} : loadNextPage;

    return (
        <CardList type={ type }>
            {/* { centers && centers.length < 1 && NoData("현재 조건에 맞는 매물이 없습니다.") }
            { loading && Loading("목록을 조회하고 있습니다.") }
            { error && Error("목록을 조회하는 데 실패했습니다. 다시 시도해 주세요.") } */}
            <ListWrap>
            {/* {
                centers && centers.length > 0 &&
                centers.map(( center, idx ) => 
                <div key={ idx }>
                    <CenterCard list={list} type={ type } center = { center } />
                    <CardDivider />
                </div>
                )
            } */}
            {
                centers && centers.length && 
                <div style={{ height: '100%' }}>
                    <AutoSizer disableHeight={true}>
                    {({ width }) => (
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <InfiniteLoader
                            isRowLoaded={isRowLoaded}
                            loadMoreRows={loadMoreRows}
                            rowCount={centers.length + 1}
                        >
                            {({ onRowsRendered, registerChild }) => (
                            <List
                                autoHeight
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                height={height}
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                rowCount={centers.length}
                                rowHeight={270}
                                rowRenderer={rowRenderer}
                                scrollTop={scrollTop}
                                width={width}
                            />
                            )}
                        </InfiniteLoader>
                        )}
                    </WindowScroller>
                    )}
                    </AutoSizer>
                </div>
            }
            </ListWrap>
        </CardList>
    )
}

export default CenterList;