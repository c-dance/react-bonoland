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
import { useNavigate, useParams } from "react-router-dom";

const CenterListContainer = () => {

    const navigate = useNavigate();
    const searchParams = useParams();

    // redux에서 가져오도록
    const FILTER = useSelector(state => state.Filter);
    const USER_NO = useSelector(state => state.User.userInfo.no);
    const MAP_INFO = useSelector(state => state.Map.infos);

    const [ options, setOptions ] = useState(null);
    
    const [ nextIndex, setNextIndex ] = useState(1);
    const [ hasNext, setHasNext ] = useState(false);
    const [ isNextLoading, setIsNextLoading ] = useState(false);

    const [ centers, setCenters ] = useState(null); // 목록 데이터
    const [ loading, error, result, setGet ] = useGet(null); // 목록 로딩

    const loadNext = async options => {
        setIsNextLoading(true);
        console.log(`==== 메인 목록 페이지 로드 (${options.latlng.length > 0 ? '필터링 목록' : '보노추천목록'}) ====`);
        const RESPONSE = options? 
            await getFilteredCenters({
                userNo: USER_NO,
                x: options.latlng.length > 1 ? options.latlng[0] : MAP_INFO.latlng[0],
                y: options.latlng.length > 1 ? options.latlng[1] : MAP_INFO.latlng[1],
                zoom: options.zoom,
                category: CATEGORIES(options.category), 
                page: nextIndex
            })
            : await getBonoCenters({ userNo: USER_NO, page: nextIndex });

        console.log(RESPONSE);
        setTimeout(function(){
            if(RESPONSE && RESPONSE.data.code === 1) {
                setCenters([...centers, ...RESPONSE.data.arrayResult]);
                setHasNext(RESPONSE.data.pageCode === 1)
            }
            setNextIndex(nextIndex => nextIndex + 1);
            setIsNextLoading(false);
        }, 2000);
    };

    const loadInitial = async (options) => {
        setIsNextLoading(true);
        // console.log(`==== 메인 목록 첫 로드 (${options.latlng.length > 0 ? '필터링 목록' : '보노추천목록'}) ====`);
        const RESPONSE = options? 
            await getFilteredCenters({
                userNo: USER_NO,
                x: options.latlng.length > 1 ? options.latlng[0] : MAP_INFO.latlng[0],
                y: options.latlng.length > 1 ? options.latlng[1] : MAP_INFO.latlng[1],
                zoom: options.zoom,
                category: options.category || CATEGORIES(options.category), 
                page: 1
            })
            : await getBonoCenters({ userNo: USER_NO, page: 1 });
        console.log('메인페이지 응답', RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 1) {
            setCenters(RESPONSE.data.arrayResult);
            setHasNext(RESPONSE.data.pageCode === 1)
        } else {
            setCenters(null);
            setHasNext(false);
        }
        setIsNextLoading(false);
        setNextIndex(2);
    };

    useEffect(() => {
        loadInitial(FILTER);
    }, [FILTER])

    useEffect(() => {
        loadInitial(options);
    }, [options])

    useEffect(() => {
        if(Object.keys(searchParams).length > 0) {
            setOptions({
                usreNo: USER_NO,
                latlng: [searchParams.x, searchParams.y],
                // x: searchParams.x,
                // y: searchParams.y,
                zoom: searchParams.zoom,
                category: [
                    { category: "단독요양원", min: searchParams.min01, max: searchParams.max01 },
                    { category: "상가요양원", min: searchParams.min02, max: searchParams.max02 },
                    { category: "주야간보호센터", min: searchParams.min03, max: searchParams.max03 }
                ]
            })
        } else {
            setOptions(null);
        }
    }, [searchParams]);


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
                        { path: '/sales/nursing', title: '시설매물' },
                        { path: '/recommend/biz', title: '추천매물' }
                    ]}
                />
                <CenterList 
                    list="main"
                    type={ isBrowser? "main" : "abstract" }
                    centers={ centers }   
                    loading={ loading }
                    error={ error }  
                    hasNext={ hasNext }
                    isNextLoading={ isNextLoading }
                    loadNext={ loadNext }
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
                    hasNext={ hasNext }
                    isNextLoading={ isNextLoading }
                    loadNext={ loadNext }
                />
                </SwipePanel>
            </>
        }
        </>
    )
};

export default CenterListContainer;