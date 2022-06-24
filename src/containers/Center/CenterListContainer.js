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
import { CATEGORY, TYPE_AND_CAPACITY } from "../../scheme/filter";
import { getAllRecommendCenters, getFilteredCenters } from '../../api/centers';
import { useGet } from "../../hooks";

const CenterListContainer = () => {

    const [ category, setCategory ] = useState(null); // 카테고리["단독요양원", "상가요양원", "주간보호"] //list
    const [ capacityActive, setCapacityActive ] = useState(false); // 정원필터 활성화
    const [ capacityValues, setCapacityValues ] = useState(null); // 정원필터 값 설정

    const region = useSelector(state => state.Map.region);
    
    const [ centers, setCenters ] = useState([]);
    const [ loading, error, noData, data, setGet ] = useGet([]);

    const submitCapacity = (event) => {
        event.preventDefault();
        LOCAL_STORAGE.store(category, capacityValues);
        setCapacityActive(false);
        // setGet({ 
        //     get: getFilteredCenters, 
        //     params: {
        //         category: category,
        //         capacity: capacityValues
        //     }
        // });
    };
    
    const resetCapacity = (event) => {
        event.preventDefault();
        LOCAL_STORAGE.store(category, TYPE_AND_CAPACITY[category][0].value);
        setCapacityValues(TYPE_AND_CAPACITY[category][0].value);
    };
    
    // category, value 함께 받아야 함
    const selectCapacity = value => {
        LOCAL_STORAGE.store(category, value);
        setCapacityValues(value);
    };

    // category만 받으면 됨
    const cancleCapacity = category => {

    };

    const closeCapacity = (event) => {
        event.preventDefault();
        setCapacityActive(false);
    };
    
    
    const slideCapacity = value => {
        setCapacityValues(value);
    };

    const selectCategory = selected => {
        setCategory(CATEGORY[selected].value);
        const capacity = LOCAL_STORAGE.get(selected);
        setCapacityValues(capacity);
        setCapacityActive(true);
    };

    useEffect(() => {
        if(category !== null) setGet({ get: getFilteredCenters, params: { category: category, capacity: capacityValues }});
        else setGet({ get: getAllRecommendCenters });
    }, []);

    useEffect(() => {
        // setCenters(data);
        console.log(data);
        setCenters(data);
        // setCenters(data[Object.keys(data)[0]]);
    }, [data]);

    /* ==== RENDER_TEMPLATE === */
    const RENDER_FILTER = () => (
        <>
            <CategoryFilter 
                value={ category }
                onCategorySelect={ selectCategory }
            />
            {   category !== null &&
                <CapacityFilter 
                category={ category }
                values={ capacityValues } 
                active={ capacityActive }
                onFormSubmit={ submitCapacity }
                onFormReset={ resetCapacity }
                onCloseClick={ closeCapacity }
                onCapacitySelect={ selectCapacity }
                onCapacitySlide={ slideCapacity }
            />}
        </>
    );

    const RENDER_LIST = () => (
        <CenterList 
            list="main"
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
                <ListMore
                    links={[
                        { path: '/sales', title: '시설매물' },
                        { path: '/recommend', title: '추천매물' }
                    ]}
                />
                { RENDER_LIST() }
            </Panel>
        }
        {
            isMobile &&
            <>
                <AddressFilterContainer type="main" />
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