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

    const USER_NO = useSelector(state => state.User.userInfo.no);

    const [ nextIndex, setNextIndex ] = useState(1);
    const [ hasNext, setHasNext ] = useState(false);
    const [ isNextLoading, setIsNextLoading ] = useState(false);
    
    const [ centers, setCenters ] = useState(null);
    const [ total, setTotal ] = useState(0);

    
    const loadNext = async () => {
        setIsNextLoading(true);
        const RESPONSE = await getUserRecentCenters({ userNo: USER_NO, page: nextIndex });
        setTimeout(function(){
            if(RESPONSE && RESPONSE.data.code === 1) { 
                setCenters(RESPONSE.data.arrayResult);
                setHasNext(RESPONSE.data.pageCode == 1);
                setTotal(RESPONSE.data.totalCount);
            }
            setIsNextLoading(false);
            setNextIndex(nextIndex => nextIndex + 1);
        }, 2000);
    };
    
    const loadInitial = async() => {
        setIsNextLoading(true);
        const RESPONSE = await getUserRecentCenters({ userNo: USER_NO, page: 1 });
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 1) { 
            setCenters(RESPONSE.data.arrayResult);
            setHasNext(RESPONSE.data.pageCode == 1);
            setTotal(RESPONSE.data.totalCount);
        }
        setIsNextLoading(false);
    };

    useEffect(() => {
        loadInitial();
    }, []);

    const onCloseClick = () => { dispatch(deactivateMyRecent()); };


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
                centers={ centers }
                // loading={ loading }
                // error={ error } 
                hasNext={ hasNext }
                isNextLoading={ isNextLoading }
                loadNext={ loadNext } 
            />
        </Section>
    )
}

export default UserRecentContainer;