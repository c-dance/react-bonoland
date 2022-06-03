import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel'

const SalesListContainer = () => {
    const [ nursings, setNursings ] = useState([]);
    const [ daycares, setDayCares ] = useState([]);

    const fetchSalesList = () => {
        fetch('./data/sales.json')
            .then(res => res.json())
            .then(data => {
                setNursings(data["요양원"]);
                setDayCares(data["주간보호"]);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchSalesList();
    }, []);

    return (
        <Panel>
            <ListHeader title="시설매매">
                <AddressFilter type="sub" />
            </ListHeader>
            <ListTab 
                navs={["요양원", "주간보호"]} 
                contents={[
                    <CenterList centers={ nursings } />,
                    <CenterList centers={ daycares } />,
                ]}
            />
        </Panel>
    )
}

export default SalesListContainer;