import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isBrowser, isMobile } from "react-device-detect";
import Panel from '../../components/ui/Panel/Panel';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import CategoryFilter from "../../components/filters/CategoryFilter/CategoryFilter";
import CenterList from "../../components/Center/CenterList/CenterList";
import ListMore from "../../components/List/ListMore/ListMore";
import AddressFilterContainer from '../filters/AddressFilterContainer';
import SwipePanel from "../../components/ui/SwipePanel/SwipePanel";
import { CATEGORY, TYPE_AND_CAPACITY } from "../../scheme/filter";
import { getAllRecommendCenters, getFilteredCenters } from '../../api/centers';
import { useGet } from "../../hooks";
import { updateFilterCategory } from "../../store/actions/filter";

const categorySet = Object.keys(CATEGORY).reduce((acc, key) => {
    return Object.assign({}, acc, {
        [key] : {
            capacity: TYPE_AND_CAPACITY[key][0].value,
            selected: false
        }
    });
}, {});

const CenterListContainer = () => {

    const dispatch = useDispatch();

    // redux에서 가져오도록
    const FILTER = useSelector(state => state.Filter);

    const [ categories, setCategories ] = useState(categorySet);
    const region = useSelector(state => state.Map.region);
    
    const [ centers, setCenters ] = useState([]);
    const [ loading, error, noData, data, setGet ] = useGet([]);

    const submitCategory = (category, capacity, selected) => {
        const value = {
            [category]: {
                capacity: capacity,
                selected: selected
            }
        };
        setCategories(Object.assign({}, categories, value));

        // update Filter Store => data 없데이트 되도록
        dispatch(updateFilterCategory(categories));
    };
    

    useEffect(() => {
        console.log(FILTER);

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
    }, [FILTER]);

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
                <CategoryFilter 
                    categories={ categories }
                    onFormSubmit={ submitCategory }
                />
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
                <CategoryFilter 
                    categories={ categories }
                    onFormSubmit={ submitCategory }
                />
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