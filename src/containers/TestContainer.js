import React, { useState, useEffect } from 'react';
import { AutoSizer, InfiniteLoader, List, WindowScroller } from 'react-virtualized';
import { getBonoCenters } from '../api/centers';

const TestContainer = () => {
    const [ pageCount, setPageCount ] = useState(1);
    const [ hasNextPage, setHasNextPage ] = useState(false);
    const [ centers, setCenters ] = useState([]);
    const [ isNextPageLoading, setIsNextPageLoading ] = useState(false);
  
    useEffect(() => {
      (async () => {
        const data = await getBonoCenters({ userNo: 26, page: pageCount });
        const centers = data.data.arrayResult;
        setCenters(centers);
        console.log('페이지 코드', data.data.pageCode);
        // setHasNextPage(data.data.pageCode === 1);
        setHasNextPage(true);
        setPageCount(pageCount => pageCount + 1);
      })();
    }, []);
  
    const rowRenderer = ({ key, index, style}) => {
      return (
        <div
          key={key}
          index={index}
          style={style}
        >
            {centers[index].detailedDescription}
        </div>
      );
    };
  
    function isRowLoaded({ index }) {
      return !!centers[index];
    }
  
    const handleNewPageLoad = async () => {
        setIsNextPageLoading(true);
        console.log('new');
        const data = await getBonoCenters({ userNo: 26, page: 1});
        setTimeout(function(){
            const centers = data.data.arrayResult;
            setPageCount(pageCount => pageCount + 1);
            console.log('데이터 더 있음', data.data.pageCode === 1);
            setHasNextPage(1);
            setCenters(currentCenters => [
              ...currentCenters,
              ...centers
            ]);
            setIsNextPageLoading(false);
        }, 2000)
    };
  
    const loadMoreRows = (isNextPageLoading || !hasNextPage)? () => {} : handleNewPageLoad;
  
    if (!centers.length) return <span>Loading initial centers</span>;
  
    return (
      <div className="container" style={{
        height: '600px'
      }}>
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
                        rowHeight={100}
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
          {isNextPageLoading && <span>loading more centers..</span>}
      </div>
    );
};

export default TestContainer;