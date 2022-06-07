import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isMobile } from 'react-device-detect';
import { useGet } from "../../hooks";
import { getUserRecentCenters } from '../../api/user';

const UserRecentContainer = () => {

    const [ recent, setRecent ] = useState([]);
    const [id, setId] = useState('123456');
    const [ loading, error, noData, data, setGet ] = useGet([]);

    useEffect(() => {
        setGet({ 
            get: getUserRecentCenters,
            id: id
        });
    }, []);

    useEffect(() => {
        setRecent(data);
    }, [data]);

    return (
        <Section
            title={ `최근 본 매물(${recent.length})` }
            themeColor={  isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            action={ false }
        >
            <CenterList 
                type={ "sub" } 
                centers={ recent }
                loading={ loading }
                error={ error }  
                noData={ noData }
            />
        </Section>
    )
}

export default UserRecentContainer;