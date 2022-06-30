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

const CenterListContainer = () => {

    // redux에서 가져오도록
    const FILTER = useSelector(state => state.Filter);
    
    const [ centers, setCenters ] = useState(null); // 목록 데이터
    const [ loading, error, result, setGet ] = useGet(null); // 목록 로딩


    useEffect(() => {
        setGet(getBonoCenters());
    }, []);

    useEffect(() => {
        if(FILTER.latlng.length > 0 || FILTER.category !== null) {
            console.log('===== 검색어 입력 OR 필터값 변경 > 목록 재조회 =====', FILTER);
            setGet(getFilteredCenters({
                x: FILTER.latlng[0],
                y: FILTER.latlng[1],
                zoom: FILTER.zoom,
                categories: CATEGORIES(FILTER.category)
            }))
            // setGet(getFilteredCenters({
            //     x:  37.49994330281196,
            //     y: 126.78276079213884,
            //     zoom: 8,
            //     categories: CATEGORIES(FILTER.category)
            // }))
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