import React, { useEffect } from "react";
import { CardList, CardDivider, ListWrap } from './CenterListStyle';
import CenterCard from "../CenterCard/CenterCard";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';
import { AutoSizer, InfiniteLoader, List, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';

const CenterList = ({
    list="",
    type="", 
    centers,
    loading,
    error,
    hasNext,
    isNextLoading,
    loadNext, 
    wrapStyle={minHeight: '100vh'}
}) => {
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 60
    });

    const isRowLoaded = ({index}) => {
        if(!hasNext) return true;
        else return !!centers[index];
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
                index < centers.length &&
                <>
                    <CenterCard list={list} type={ type } center = { centers[index] } />
                    <CardDivider />
                </>
            }
            { index === centers.length && hasNext && <span>loading...</span>  }
            { index === centers.length && !hasNext && <span>end</span>  }
        </div>
      </CellMeasurer>
    );

    const loadMoreRows = isNextLoading? () => {} : loadNext;


    return (
        <CardList type={ type }>
            {/* { centers && centers.length < 1 && NoData("현재 조건에 맞는 매물이 없습니다.") }
            { loading && Loading("목록을 조회하고 있습니다.") }
            { error && Error("목록을 조회하는 데 실패했습니다. 다시 시도해 주세요.") } */}
            <ListWrap>
            {
                centers && centers.length > 0 && 
                <InfiniteLoader
                    isRowLoaded={ isRowLoaded }
                    loadMoreRows={ loadMoreRows }
                    rowCount={ centers.length + 1}  
                    >
                    {({ onRowsRendered, registerChild }) => (
                        <div style={{height: 'auto'}}>
                        <WindowScroller 
                            height={'2000px'}
                        >
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
                                    rowCount={ centers.length + 1}
                                    rowHeight={ cache.rowHeight }
                                    rowRenderer={rowRenderer}
                                    style={{height: 'auto'}}
                                />
                                )}
                            </AutoSizer>
                            )
                        }
                        </WindowScroller>
                        </div>
                    )}
                    </InfiniteLoader>
            }
            </ListWrap>
        </CardList>
    )
}

export default CenterList;