import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Section from "../../components/ui/Section/Section";
import CenterList from '../../components/Center/CenterList/CenterList';
import { isBrowser, isMobile } from 'react-device-detect';
import { useGet } from '../../hooks';
import { getUserLocalAlarm } from '../../api/user';
import { deactivateMyAlarm, activateMyAlarmForm } from '../../store/actions/page';

const UserAlarmContainer = () => {

    const dispatch = useDispatch();

    const USER_NO = useSelector(state => state.User.userInfo.no);
    const USER_ALARMS = useSelector(state => state.User.userInfo.alarms);

    const [ nextIndex, setNextIndex ] = useState(1);
    const [ hasNext, setHasNext ] = useState(false);
    const [ isNextLoading, setIsNextLoading ] = useState(false);
    
    const [ centers, setCenters ] = useState(null);
    const [ errMsg, setErrMsg ] = useState('');
    const [ total, setTotal ] = useState(0);

    
    const loadNext = async () => {
        setIsNextLoading(true);
        const RESPONSE = await getUserLocalAlarm({ userNo: USER_NO, page: nextIndex });
        setTimeout(function(){
            if(RESPONSE && RESPONSE.data.code === 1) { 
                setCenters(RESPONSE.data.arrayResult);
                setHasNext(RESPONSE.data.pageCode == 1);
                setTotal(RESPONSE.data.totalCount);
                setErrMsg('');
            } else {
                setErrMsg('알림 지역 매물이 없습니다.');
            }
            setIsNextLoading(false);
            setNextIndex(nextIndex => nextIndex + 1);
        }, 2000);
    };
    
    const loadInitial = async() => {
        setIsNextLoading(true);
        const RESPONSE = await getUserLocalAlarm({ userNo: USER_NO, page: 1 });
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 1) { 
            setCenters(RESPONSE.data.arrayResult);
            setHasNext(RESPONSE.data.pageCode == 1);
            setTotal(RESPONSE.data.totalCount);
            setErrMsg('');
        } else {
            setErrMsg('알림 지역 매물이 없습니다.');
        }
        setIsNextLoading(false);
    };

    useEffect(() => {
        if(USER_ALARMS.length < 0) setErrMsg('알림 받을 지역을 설정해 주세요.');
        else loadInitial();
    }, [USER_ALARMS]);

    const onCloseClick = () => { dispatch(deactivateMyAlarm()); };

    return (
        <Section
            title={ `알림 매물(${total})` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile &&  true }
            onCloseClick={ onCloseClick }
            onBackClick={ onCloseClick }
            option={ true }
            optionText = { "지역설정" }
            onOptionClick={ () => { dispatch(activateMyAlarmForm()); } }
        >
            <CenterList 
                type={ "sub" } 
                centers={ centers }
                hasNext={ hasNext }
                isNextLoading={ isNextLoading }
                loadNext={ loadNext } 
                msg={ errMsg }
            />
        </Section>
    )
}

export default UserAlarmContainer;