import UserAlarmForm from '../../components/User/UserAlarmForm/UserAlarmForm';
import Section from '../../components/ui/Section/Section';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateAlarm } from '../../store/actions/mode';
import { REGIONS, OBJECT_TO_ARRAY, ARRAY_TO_OBJECT } from '../../sheme/alarm';
import { setUserLocalAlarm } from '../../api/user';
import { updateUserInfo } from '../../store/actions/user';
import { activateAlert } from '../../store/actions/alert';

const UserAlarmFormContainer = () => {

    const dispatch = useDispatch();

    const USER_EMAIL = useSelector(state => state.User.userInfo.id);
    const ALARMS = useSelector(state => state.User.userInfo.alarms);
    const [ dataset, setDataset ] = useState(Object.assign(REGIONS));

    const onFormSubtmit = async () => {
        const alarmSet = OBJECT_TO_ARRAY(dataset);
        const RESPONSE = await setUserLocalAlarm({
            userEmail: USER_EMAIL,
            localAlertsDepth1: alarmSet
        });
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 0) {
            dispatch(updateUserInfo({
                alarms: alarmSet
            }))
        } else {
            dispatch(activateAlert({
                title: "지역 알림 설정",
                contents: RESPONSE.data.message || "지역알림 설정 중 오류가 발생했습니다. \n 다시 시도해 주세요."
            }))
        }
    };

    const onFormChange = (keys) => {
        const data = Object.assign({}, dataset);
        if(keys.length > 1) {
            data[keys[0]][keys[1]].value = !data[keys[0]][keys[1]].value;    
        } else {
            data[keys[0]].value = !data[keys[0]].value;
        }
        setDataset(data);
    };

    useEffect(() => {
        setDataset(ARRAY_TO_OBJECT(ALARMS));
    }, [ALARMS]);

    return (
        <Section
            themeColor="primary"
            close={ true }
            onCloseClick={ () => dispatch(deactivateAlarm()) }
            action={ true }
            actionText={ "확인" }
            onActionClick={ () => onFormSubtmit() }
        >
            <UserAlarmForm 
                dataset={ dataset }
                onFormChange={ onFormChange }
            />
        </Section>
    )
};

export default UserAlarmFormContainer;