import { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import KeywordFilter from "../../components/filters/KeywordFilter/KeywordFilter";
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel'
import { isMobile } from 'react-device-detect';

const SalesListContainer = () => {
    const [ nursings, setNursings ] = useState([]);
    const [ daycares, setDayCares ] = useState([]);

    const [ activeIdx, setActiveIdx ] = useState(0);
    const toggleTab = (idx) => {
        console.log(idx);
        setActiveIdx(idx);
    };

    const fetchSalesList = () => {
        fetch('./data/sales.json')
            .then(res => res.json())
            .then(data => {
                setNursings(data["요양원"]);
                setDayCares(data["주간보호"]);
                console.log(data["요양원"]);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchSalesList();
    }, []);

    return (
        <Panel>
            <ListHeader title="시설매매">
                <KeywordFilter />
            </ListHeader>
            <ListTab 
                activeIdx={ activeIdx }
                tabClick={ toggleTab }
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