import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CenterList from '../../components/Center/CenterList/CenterList';
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel'
import { getRecommendCenters } from '../../api/centers';
import { useGet } from "../../hooks";
import AddressFilterContainer from '../filters/AddressFilterContainer';

const RecommendListContainer = () => {

    const FILTER = useSelector(state => state.Filter);

    const [ bizs, setBizs ] = useState([]);
    const [ remodelings, setremodelings ] = useState([]);

    const [ loading, error, noData, data, setGet ] = useGet([]);


    useEffect(() => {
        // setGet(getRecommendCenters);
    }, []);

    useEffect(() => {
        console.log('===== 추천매물 + 검색어 필터 > 목록 재조회 =====', FILTER);
        console.log('>>> 추천목록 가져오기!');
    }, [FILTER])

    useEffect(() => {
        if(Object.keys(data).length > 0) {
            setBizs(data["신규 사업지"]);
            setremodelings(data["신규 리모델링"]);
        }
    }, [data]);

    return (
        <Panel>
            <ListHeader title="추천매물">
                <AddressFilterContainer type="sub" />
            </ListHeader>
            <ListTab 
                navs={["신규 사업지", "신규 리모델링"]} 
                contents={[
                    <CenterList 
                        list="recommend"
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ bizs } 
                        cardUrl="sales"
                    />,
                    <CenterList 
                        list="recommend"
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ remodelings } 
                        cardUrl="sales"
                    />,
                ]}
            />
        </Panel>
    )
}

export default RecommendListContainer;