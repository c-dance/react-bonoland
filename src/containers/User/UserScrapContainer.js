import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isMobile } from 'react-device-detect';
import ListTab from '../../components/List/ListTab/ListTab';
import React, { useState, useEffect } from "react";
import { useGet } from '../../hooks';
import { getUserScrapCenters } from '../../api/user';

const UserScrapContainer = () => {

    const [ centers, setCenters ] = useState({});
    const [ sales, setSales ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [id, setId] = useState('123456');
    const [ loading, error, noData, data, setGet ] = useGet([]);

    useEffect(() => {
        setGet({ 
            get: getUserScrapCenters,
            id: id
        });
    }, []);

    useEffect(() => {
        // setCenters(data["시설"]);
        // setSales(data["매물"]);
        // if(data["시설"] && data["매물"]) {
        //     const totalLen = data["시설"].length + data["매물"].length
        //     setTotal(totalLen);
        // }
        
        if(Object.keys(data).length > 0) {
            setCenters(data[Object.keys(data)[0]]["시설"]);
            setSales(data[Object.keys(data)[0]]["매물"]);
            if(data[Object.keys(data)[0]]["시설"] && data[Object.keys(data)[0]]["매물"]) {
                const totalLen = data[Object.keys(data)[0]]["시설"].length + data[Object.keys(data)[0]]["매물"].length
                setTotal(totalLen);
            } 
        }
    }, [data]);

    return (
        
        <Section
            title={ `찜 매물(${ total })` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            action={ false }
        >
            <ListTab 
                // type={ isBrowser? "full" : "" }
                navs={["매물", "시설"]} 
                contents={[
                    <CenterList 
                        type={ "sub" } 
                        centers={ sales } 
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                    />,
                    <CenterList 
                        type={ "sub" } 
                        centers={ centers } 
                        loading={ loading }
                        error={ error }  
                        noData={ noData }
                    />,
                ]}
            />
        </Section>
    )
}

export default UserScrapContainer;