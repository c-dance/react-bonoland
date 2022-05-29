import { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel'

const RecommendListContainer = () => {
    const [ bizs, setBizs ] = useState([]);
    const [ remodelings, setremodelings ] = useState([]);

    const fetchSalesList = () => {
        fetch('./data/recommends.json')
            .then(res => res.json())
            .then(data => {
                setremodelings(data["신규 사업지"]);
                setBizs(data["신규 리모델링"]);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchSalesList();
    }, []);

    return (
        <Panel>
            <ListHeader title="추천매물">
                <AddressFilter type="sub" />
            </ListHeader>
            <ListTab 
                navs={["신규 사업지", "신규 리모델링"]} 
                contents={[
                    <CenterList centers={ bizs } />,
                    <CenterList centers={ remodelings } />,
                ]}
            />
        </Panel>
    )
}

export default RecommendListContainer;