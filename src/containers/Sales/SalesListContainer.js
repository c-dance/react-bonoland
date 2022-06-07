import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel';
import { getSalesCenters } from '../../api/centers';
import { useGet } from "../../hooks";


const SalesListContainer = () => {
    const [ nursings, setNursings ] = useState([]);
    const [ daycares, setDayCares ] = useState([]);

    const [ loading, error, noData, data, setGet ] = useGet({});

    useEffect(() => {
        setGet({ get: getSalesCenters });
    }, []);

    useEffect(() => {
        // data[Object.keys(data)[0]]
        // setNursings(data["요양원"]);
        // setDayCares(data["주간보호"]);
        if(Object.keys(data).length > 0) {
            setNursings(data[Object.keys(data)[0]]["요양원"]);
            setDayCares(data[Object.keys(data)[0]]["주간보호"]);
        }
    }, [data]);

    return (
        <Panel>
            <ListHeader title="시설매매">
                <AddressFilter type="sub" />
            </ListHeader>
            <ListTab 
                navs={["요양원", "주간보호"]} 
                contents={[
                    <CenterList 
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ nursings } 
                    />,
                    <CenterList 
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                        centers={ daycares } 
                    />,
                ]}
            />
        </Panel>
    )
}

export default SalesListContainer;