import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isBrowser, isMobile } from "react-device-detect";
import Panel from '../../components/ui/Panel/Panel';
import CenterList from "../../components/Center/CenterList/CenterList";
import ListMore from "../../components/List/ListMore/ListMore";
import AddressFilterContainer from '../filters/AddressFilterContainer';
import CategoryFilterContainer from "../filters/CategoryFilterContainer";
import SwipePanel from "../../components/ui/SwipePanel/SwipePanel";
import { CATEGORIES } from "../../scheme/filter";
import { getBonoCenters, getFilteredCenters } from '../../api/centers';
import { useGet } from "../../hooks";
import { AutoResizer, InfiniteLoader, List, WindowScroller } from 'react-virtualized';

const CenterListContainer = () => {

    // redux에서 가져오도록
    const FILTER = useSelector(state => state.Filter);
    const USER_NO = useSelector(state => state.User.userInfo.no);
    
    const [ pageIndex, setPageIndex ] = useState(1);
    const [ hasNextPage, setHasNextPage ] = useState(false);
    const [ isNextPageLoading, setIsNextPageLoading ] = useState(false);

    const [ centers, setCenters ] = useState(null); // 목록 데이터
    const [ loading, error, result, setGet ] = useGet(null); // 목록 로딩

    const loadNextPage = async () => {
        if(!isNextPageLoading && hasNextPage) {
            console.log('load more page')
            setIsNextPageLoading(true);
            const RESPONSE = await getBonoCenters({userNo: USER_NO, page: pageIndex});
            if(RESPONSE && RESPONSE.data.code === 1) {
                setTimeout(function(){
                    setCenters(centers => [...centers, ...RESPONSE.data.arrayResult]);
                    setIsNextPageLoading(false);
                    setPageIndex(pageIndex => pageIndex + 1);
                    setHasNextPage(RESPONSE.data.pageCode === 1);
                    // setHasNextPage(true);
                }, 2000);
            }
        }
    };

    useEffect(() => {
        // setGet(getBonoCenters({ userNo: USER_NO, page: pageIdx }));
        (async () => {
            const RESPONSE = await getBonoCenters({userNo: USER_NO, page: pageIndex});
            console.log(RESPONSE);
            setCenters(RESPONSE.data.arrayResult);
            // setHasNextPage(true);
            setHasNextPage(RESPONSE.data.pageCode === 1);
            setPageIndex(pageIndex => pageIndex + 1);
            // setIsNextPageLoading(false);
        })();
    }, []);

    useEffect(() => {
        if(FILTER.latlng.length > 0 || FILTER.category !== null) {
            console.log('===== 검색어 입력 OR 필터값 변경 > 목록 재조회 =====', FILTER);
            setCenters(null);
            setGet(getFilteredCenters({
                x: FILTER.latlng[0],
                y: FILTER.latlng[1],
                zoom: FILTER.zoom,
                userNo: USER_NO,
                categories: CATEGORIES(FILTER.category)
            }))
        }
    }, [FILTER])

    useEffect(() => {
        if(result) setCenters(result.arrayResult || []);
    }, [result]);

    return (
        <>
        {
            isBrowser &&
            <Panel
                type={ "floating" }
                position={ "left" }
                fold={ true }
            >
                <AddressFilterContainer type="main" />
                <CategoryFilterContainer />
                <ListMore
                    links={[
                        { path: '/sales', title: '시설매물' },
                        { path: '/recommend', title: '추천매물' }
                    ]}
                />
                <CenterList 
                    list="main"
                    type={ isBrowser? "main" : "abstract" }
                    centers={ centers }   
                    loading={ loading }
                    error={ error }  
                    hasNextPage={ hasNextPage }
                    isNextPageLoading={ isNextPageLoading }
                    loadNextPage={ loadNextPage }
                />
            </Panel>
        }
        {
            isMobile &&
            <>
                <AddressFilterContainer type="main" />
                <CategoryFilterContainer />
                <SwipePanel>
                <CenterList 
                    list="main"
                    type={ isBrowser? "main" : "abstract" }
                    centers={ centers }   
                    loading={ loading }
                    error={ error }  
                />
                </SwipePanel>
            </>
        }
        </>
    )
};

export default CenterListContainer;