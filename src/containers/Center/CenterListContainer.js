import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isBrowser, isMobile } from "react-device-detect";
import Panel from '../../components/ui/Panel/Panel';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import CategoryFilter from "../../components/filters/CategoryFilter/CategoryFilter";
import CapacityFilter from "../../components/filters/CapacityFIlter/CapacityFilter";
import CenterList from "../../components/Center/CenterList/CenterList";
import ListMore from "../../components/List/ListMore/ListMore";
import AddressFilterContainer from '../filters/AddressFilterContainer';
import SwipePanel from "../../components/ui/SwipePanel/SwipePanel";
import { LOCAL_STORAGE } from '../../utils/filter';
import { CATEGORY, CAPACITY } from "../../sheme/filter";
import { getAllRecommendCenters, getFilteredCenters } from '../../api/centers';
import { useGet } from "../../hooks";

const CenterListContainer = () => {

    const [ category, setCategory ] = useState(null); // 카테고리["단독요양원", "상가요양원", "주간보호"]
    const [ capacityActive, setCapacityActive ] = useState(false); // 정원필터 활성화
    const [ capacityValues, setCapacityValues ] = useState(CAPACITY[0].value); // 정원필터 값 설정

    const region = useSelector(state => state.Map.region);
    
    const [ centers, setCenters ] = useState([]);
    const [ loading, error, noData, data, setGet ] = useGet([]);

    const submitCapacity = (event) => {
        event.preventDefault();
        LOCAL_STORAGE.store(CATEGORY[category].key, capacityValues);
        setCapacityActive(false);
        setGet({ 
            get: getFilteredCenters, 
            params: {
                category: category,
                capacity: capacityValues
            }
        });
    };
    
    const resetCapacity = (event) => {
        event.preventDefault();
        LOCAL_STORAGE.store(CATEGORY[category].key, CAPACITY[0].value);
        setCapacityValues(CAPACITY[0].value);
    };
    
    const closeCapacity = (event) => {
        event.preventDefault();
        setCapacityActive(false);
    };
    
    const selectCapacity = value => {
        console.log('clicked', value)
        console.log('clicked', typeof value)
        LOCAL_STORAGE.store(CATEGORY[category].key, CAPACITY[0].value);
        setCapacityValues(value);
    };
    
    const slideCapacity = value => {
        setCapacityValues(value);
    };

    const selectCategory = selected => {
        setCategory(CATEGORY[selected].value);
        const capacity = LOCAL_STORAGE.get(CATEGORY[selected].key);
        console.log(capacity);
        setCapacityValues(capacity);
        setCapacityActive(true);
    };

    useEffect(() => {
        if(category !== null) setGet({ get: getFilteredCenters, params: { category: category, capacity: capacityValues }});
        else setGet({ get: getAllRecommendCenters });
    }, []);

    useEffect(() => {
        setCenters(data);
    }, [data]);

    /* ==== RENDER_TEMPLATE === */
    const RENDER_FILTER = () => (
        <>
            <CategoryFilter 
                value={ category }
                onCategorySelect={ selectCategory }
            />
            <CapacityFilter 
                values={ capacityValues } 
                active={ capacityActive }
                onFormSubmit={ submitCapacity }
                onFormReset={ resetCapacity }
                onCloseClick={ closeCapacity }
                onCapacitySelect={ selectCapacity }
                onCapacitySlide={ slideCapacity }
            />
        </>
    );

    const RENDER_LIST = () => (
        <CenterList 
            type={ isBrowser? "main" : "abstract" }
            centers={ centers }   
            loading={ loading }
            error={ error }  
            noData={ noData }
        />
    );

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
                { RENDER_FILTER() }
                <ListMore path="/recommend" text="추천 & 프리미엄 더보기" />
                { RENDER_LIST() }
            </Panel>
        }
        {
            isMobile &&
            <>
                { RENDER_FILTER() }
                <SwipePanel>
                { RENDER_LIST() }
                </SwipePanel>
            </>
        }
        </>
    )
};

export default CenterListContainer;