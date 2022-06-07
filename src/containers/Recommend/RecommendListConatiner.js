import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel'
import { getRecommendCenters } from '../../api/centers';
import { useGet } from "../../hooks";

const RecommendListContainer = () => {
    const [ bizs, setBizs ] = useState([]);
    const [ remodelings, setremodelings ] = useState([]);

    const [ loading, error, noData, data, setGet ] = useGet([]);


    useEffect(() => {
        setGet({ get: getRecommendCenters });
    }, []);

    useEffect(() => {
        setBizs(data["신규 사업지"]);
        setremodelings(data["신규 리모델링"]);
    }, [data]);

    return (
        <Panel>
            <ListHeader title="추천매물">
                <AddressFilter type="sub" />
            </ListHeader>
            <ListTab 
                navs={["신규 사업지", "신규 리모델링"]} 
                contents={[
                    <CenterList 
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ bizs } 
                    />,
                    <CenterList 
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ remodelings } 
                    />,
                ]}
            />
        </Panel>
    )
}

export default RecommendListContainer;