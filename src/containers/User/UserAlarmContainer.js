import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Section from "../../components/ui/Section/Section";
import CenterList from '../../components/Center/CenterList/CenterList';
import { isBrowser, isMobile } from 'react-device-detect';
import { useGet } from '../../hooks';
import { getUserAlarmCenters } from '../../api/user';
import { activateAlarm } from '../../store/actions/mode';

const UserAlarmContainer = () => {

    const dispatch = useDispatch();

    const USER_ALARMS = useSelector(state => state.User.userInfo.alarms);
    const [ alarms, setAlarms ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ loading, error, noData, data, setGet ] = useGet([]);

    useEffect(() => {
        if(!USER_ALARMS && USER_ALARMS.length <= 0) {
            dispatch(activateAlarm());
        }
    }, []);

    useEffect(() => {
        // setAlarms(data);
        // if(data) setTotal(data.length);
        // if(Object.keys(data).length > 0) {
        //     setAlarms(data[Object.keys(data)[0]]);
        //     setTotal(data[Object.keys(data)[0]].length);
        // }
    }, [data]);

    return (
        <Section
            title={ `알림 매물(${total})` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ true }
            back={ true }
            action={ false }
            backText = { "지역 설정" }
            onBackClick={ () => { dispatch(activateAlarm()); } }
        >
            <CenterList 
                type={ "sub" } 
                centers={ alarms }
                loading={ loading }
                error={ error }  
                noData={ noData }
            />
        </Section>
    )
}

export default UserAlarmContainer;