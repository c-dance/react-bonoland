import React, { useState, useEffect } from "react";
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
import { getRecommendCenters } from '../../api/centers';
import { useGet } from "../../hooks";

const CenterListContainer = () => {

    const [ category, setCategory ] = useState(null); // 카테고리["단독요양원", "상가요양원", "주간보호"]
    const [ capacityActive, setCapacityActive ] = useState(false); // 정원필터 활성화
    const [ capacityValues, setCapacityValues ] = useState(CAPACITY[0].value); // 정원필터 값 설정
    
    const [ centers, setCenters ] = useState([]);

    const [ loading, error, noneData, data, setApi ] = useGet([]);

    const submitCapacity = (event) => {
        event.preventDefault();
        LOCAL_STORAGE.store(CATEGORY[category].key, capacityValues);
        setCapacityActive(false);
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

    const fetchCenters = () => {
        fetch('/data/centers.json', {
            headers: {
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setCenters(data);
        })
        .catch(err => console.log(err));
    };



    useEffect(() => {
        // fetchCenters();
        setApi(getRecommendCenters);
    }, [data]);

    console.log(data);


    const listFilter = () => (
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
                { listFilter() }
                <ListMore path="/recommend" text="추천 & 프리미엄 더보기" />
                <CenterList 
                    type="main" 
                    centers= { data }     
                />
            </Panel>
        }
        {
            isMobile &&
            <>
                { listFilter() }
                <SwipePanel>
                    <CenterList 
                        type="abstract" 
                        centers= { data } 
                    />
                </SwipePanel>
            </>
        }
        </>
    )
};

export default CenterListContainer;