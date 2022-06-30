import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CenterList from '../../components/Center/CenterList/CenterList';
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel';
import { getSalesCenters } from '../../api/centers';
import { useGet } from "../../hooks";
import AddressFilterContainer from '../filters/AddressFilterContainer';


const SalesListContainer = () => {
    const FILTER = useSelector(state => state.Filter);

    const [ nursings, setNursings ] = useState([]);
    const [ daycares, setDayCares ] = useState([]);

    const [ loading, error, data, setGet ] = useGet({});

    useEffect(() => {
        // setGet(getSalesCenters);
    }, []);

    useEffect(() => {
        console.log('===== 시설매물 + 검색어 필터 > 목록 재조회 =====', FILTER);
        console.log('>>> 시설목록 가져오기!');
    }, [FILTER]);

    useEffect(() => {
        // data[Object.keys(data)[0]]
        if(Object.keys(data).length > 0) {
            setNursings(data["요양원"]);
            setDayCares(data["주간보호"]);
        }
    }, [data]);

    return (
        <Panel>
            <ListHeader title="시설매매">
                <AddressFilterContainer type="sub" />
            </ListHeader>
            <ListTab 
                navs={["요양원", "주간보호"]} 
                contents={[
                    <CenterList 
                        list="sales"
                        loading={ loading }
                        error={ error }  
                        centers={ nursings } 
                        cardUrl="sales"
                    />,
                    <CenterList 
                        list="sales"
                        loading={ loading }
                        error={ error }  
                        centers={ daycares } 
                        cardUrl="sales"
                    />,
                ]}
            />
        </Panel>
    )
}

export default SalesListContainer;