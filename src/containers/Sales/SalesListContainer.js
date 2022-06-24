import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel';
import { getSalesCenters } from '../../api/centers';
import { useGet } from "../../hooks";
import AddressFilterContainer from '../filters/AddressFilterContainer';


const SalesListContainer = () => {
    const [ nursings, setNursings ] = useState([]);
    const [ daycares, setDayCares ] = useState([]);

    const [ loading, error, noData, data, setGet ] = useGet({});

    useEffect(() => {
        setGet(getSalesCenters);
    }, []);

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
                        noData={ noData }
                        centers={ nursings } 
                        cardUrl="sales"
                    />,
                    <CenterList 
                        list="sales"
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ daycares } 
                        cardUrl="sales"
                    />,
                ]}
            />
        </Panel>
    )
}

export default SalesListContainer;