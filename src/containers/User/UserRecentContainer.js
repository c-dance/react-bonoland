import React, { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isMobile } from 'react-device-detect';
import { useGet } from "../../hooks";
import { getUserRecentCenters } from '../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateMyRecent } from '../../store/actions/page';

const UserRecentContainer = () => {

    const dispatch = useDispatch();

    const USER_ID = useSelector(state => state.User.userInfo.no);
    const [ total, setTotal ] = useState(0);
    const [ recent, setRecent ] = useState([]);
    const [ loading, error, data, setGet ] = useGet([]);

    const onCloseClick = () => { dispatch(deactivateMyRecent()); };

    useEffect(() => {
        setGet(getUserRecentCenters(USER_ID));
    }, []);

    useEffect(() => {
        if(data && data.arrayResult) {
            console.log(data)
            setRecent(data.arrayResult);
            setTotal(data.arrayResult.length);
        }
    }, [data]);

    return (
        <Section
            title={ `최근 본 매물(${total})` }
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