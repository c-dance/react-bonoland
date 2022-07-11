import UserAlarmForm from '../../components/User/UserAlarmForm/UserAlarmForm';
import Section from '../../components/ui/Section/Section';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateMyAlarmForm } from '../../store/actions/page';
import { REGIONS } from '../../scheme/alarm';
import { setUserLocalAlarm } from '../../api/user';
import { updateUserInfo } from '../../store/actions/user';
import { activateAlert } from '../../store/actions/alert';
import { isBrowser, isMobile } from 'react-device-detect';

const UserAlarmFormContainer = () => {

    const dispatch = useDispatch();

    const USER_EMAIL = useSelector(state => state.User.userInfo.id);
    const ALARMS = useSelector(state => state.User.userInfo.alarms);
    const [ dataset, setDataset ] = useState(REGIONS.stringToObject(ALARMS));

    const onFormSubtmit = async () => {
        const alarmSet = REGIONS.objectToArray(dataset);

        const RESPONSE = await setUserLocalAlarm({
            userEmail: USER_EMAIL,
            localAlertsDepth1: alarmSet.length > 0 ? alarmSet : ["없음"]
        });

        if(RESPONSE && RESPONSE.data.code === 0) {
            dispatch(updateUserInfo({
                alarms: alarmSet.join('/')
            }));
            dispatch(activateAlert({
                title: "지역 알림 설정",
                contents: "지역알림 설정이 완료되었습니다."
            }));
        } else {
            dispatch(activateAlert({
                title: "지역 알림 설정",
                contents: RESPONSE.data.message || "지역알림 설정 중 오류가 발생했습니다. \n 다시 시도해 주세요."
            }));
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
        setDataset(REGIONS.stringToObject(ALARMS));
    }, [ALARMS]);

    return (
        <Section
            title={ isMobile && "지역 알림" }
            themeColor="primary"
            close={  isBrowser && true }
            back={ isMobile && true }
            onCloseClick={ () => dispatch(deactivateMyAlarmForm()) }
            onBackClick={ () => dispatch(deactivateMyAlarmForm()) }
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