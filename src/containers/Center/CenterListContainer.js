import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isBrowser, isMobile } from "react-device-detect";
import Panel from '../../components/ui/Panel/Panel';
import CenterList from "../../components/Center/CenterList/CenterList";
import ListMore from "../../components/List/ListMore/ListMore";
import AddressFilterContainer from '../filters/AddressFilterContainer';
import CategoryFilterContainer from "../filters/CategoryFilterContainer";
import SwipePanel from "../../components/ui/SwipePanel/SwipePanel";
import { CATEGORY, TYPE_AND_CAPACITY } from "../../scheme/filter";
import { getAllRecommendCenters, getFilteredCenters } from '../../api/centers';
import { useGet } from "../../hooks";

const categorySet = Object.keys(CATEGORY).reduce((acc, key) => {
    return Object.assign({}, acc, {
        [key] : {
            capacity: TYPE_AND_CAPACITY[key][0].value,
            selected: false
        }
    });
}, {});

const CenterListContainer = () => {

    // redux에서 가져오도록
    const FILTER = useSelector(state => state.Filter);
    
    const [ centers, setCenters ] = useState([]); // 목록 데이터
    const [ loading, error, noData, data, setGet ] = useGet([]); // 목록 로딩

    // 리스트 가져오기
    const getCenterList = () => {
        // 필터 카테고리로 재구성 : data 변수에 새로운 값 던져 줌 (검색 카테고리가 같을 경우 던져주지 않음 - submit category에서 처리)

        // if(Object.keys(categories).filter(key => categories[key].selected).length < 0) {
        //     setGet({ get: getAllRecommendCenters });
        // } else {
        //     setGet({ 
        //         get: getFilteredCenters, 
        //         params: {
        //             category: category,
        //             capacity: capacityValues
        //         }
        //     });
        // }

        console.log(">>> 목록 가져오기!");
    };

    useEffect(() => {
        if(FILTER.latlng.length > 0 || FILTER.category !== null) {
            console.log('===== 검색어 입력 OR 필터값 변경 > 목록 재조회 =====', FILTER);
            getCenterList();
        }
        
    }, [FILTER])

    useEffect(() => {
        setCenters(data);
        // setCenters(data[Object.keys(data)[0]]);
    }, [data]);

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
                    noData={ noData }
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
                    noData={ noData }
                />
                </SwipePanel>
            </>
        }
        </>
    )
};

export default CenterListContainer;