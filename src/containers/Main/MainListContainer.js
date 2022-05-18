import KeywordFilter from "../../components/filters/KeywordFilter/KeywordFilter";
import CategoryFilter from "../../components/filters/CategoryFilter/CategoryFilter";
import CapacityFilter from "../../components/filters/CapacityFIlter/CapacityFilter";
import CenterList from "../../components/Center/CenterList/CenterList";
import ListMore from "../../components/List/ListMore/ListMore";
import React, { useState, useEffect } from "react";


const MainListContainer = () => {
    /*
        search(1) 키워드 : 지역구, 지역명
        search(2) 카레고리: 단독 요양원, 상가 요양원, 주간 보호
        search(3) 필터 : 정원
    */
   /*
        router: [center, zoom, region] 갖고 추천 페이지 이동
   */
   /*
        list(1) : search 조합 조회 목록
   */

    const [ capacityActive, setCapacityActive ] = useState(false);
    const [ capacityValues, setCapacityValues ] = useState([0, 100]);
    const [ category, setCategory ] = useState(null);
    const [ centers, setCenters ] = useState([]);

    const toggleCapacity = () => {
        setCapacityActive(!capacityActive);
    };

    const selectCapacity = (values) => {
        // 인가정원 값 저장 (local)
        console.log(values);
    };

    const resetCapacity = () => {
        // 인가정원 값 리셋
    };

    const selectCategory = (name) => {
        // 선택 카테고리 변경
        // 인가정원 값 변경
        // 인가정원 필터 활성화
        setCategory(name);
        setCapacityValues(getStorageCapacity(name));
        setCapacityActive(true);
    };
    
    const getStorageCapacity = (category) => {
        return [20, 30];
    };

    const fetchCenters = () => {
        fetch('./data/centers.json')
            .then(res => res.json())
            .then(data => {
                setCenters(data);
            })
            .catch(err => console.err(err));
    };

    useEffect(() => {
        fetchCenters();
    }, [])



    return (
        <>
            <KeywordFilter />
            <CategoryFilter 
                selectHandler={ selectCategory }     
            />
            <CapacityFilter 
                values={ capacityValues } 
                active={ capacityActive }
                confirmHandler={ toggleCapacity } 
                selectHandler = { selectCapacity } 
            />
            <ListMore path="/recommend" text="추천 & 프리미엄 더보기" />
            <CenterList type={"main"} centers= { centers } />
        </>
    )
};

export default MainListContainer;