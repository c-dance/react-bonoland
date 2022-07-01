import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isMobile } from 'react-device-detect';
import { useGet } from "../../hooks";
import { getUserRecentCenters } from '../../api/user';
import { useDispatch } from 'react-redux';
import { deactivateMyRecent } from '../../store/actions/page';

const UserRecentContainer = () => {

    const dispatch = useDispatch();

    const [ recent, setRecent ] = useState([]);
    const [id, setId] = useState('123456');
    const [ loading, error, data, setGet ] = useGet([]);

    const onCloseClick = () => { dispatch(deactivateMyRecent()); };

    useEffect(() => {
        setGet(getUserRecentCenters(id));
    }, []);

    useEffect(() => {
        // setRecent(data);
        if(Object.keys(data).length > 0) {
            setRecent(data[Object.keys(data)[0]]);
        }
    }, [data]);

    return (
        <Section
            title={ `최근 본 매물(${recent.length})` }
            themeColor={  isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            onCloseClick={ onCloseClick }
            onBackClick={ onCloseClick }
            action={ false }
        >
            <CenterList 
                type={ "sub" } 
                centers={ recent }
                loading={ loading }
                error={ error }  
            />
        </Section>
    )
}

export default UserRecentContainer;