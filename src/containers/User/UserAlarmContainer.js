import { useState } from 'react';
import { useFetch } from '../../hooks/form';
import Section from "../../components/ui/Section/Section";
import CenterList from '../../components/Center/CenterList/CenterList';
import UserAlarmForm from '../../components/User/UserAlarmForm/UserAlarmForm';
import { Loading, NoResult, Fail } from '../../components/ui/Inform/Inform';

const UserAlarmContainer = () => {

    const [ page, alarms ] = useFetch([], '/data/centers.json');
    // 알람 설정 여부
    const [ alarm, setAlarm ] = useState(false);
    // 페이지 전환 여부
    const [ tabIdx, setTabIdx ] = useState(0);
    // 설정 폼
    const [ formState, formData ] = useFetch({}, '/data/center/.json');

    const goToAlarmSetting = () => {
        console.log('go to alarmset');
    };

    const submitAlarmForm = () => {
        console.log('submit Form');
    };

    return (
        <div>
            {
                (!alarm || alarm && tabIdx === 0)&& 
                <Section
                    title={ "지역 알림 설정" }
                    themeColor={ "primary" }
                    close={ true }
                    action={ true }
                    actionText={ "확인" }
                    onActionClick = { submitAlarmForm }
                >
                    <UserAlarmForm data={ formData } />
                </Section>

            }
            {
                alarm && tabIdx === 1 &&
                <Section
                    title={ `알림 매물(${alarms.length})` }
                    themeColor={ "primary" }
                    close={ true }
                    action={ false }
                    back={ true }
                    backText = { "지역 설정" }
                    onBackClick={ goToAlarmSetting }
                >

                    { page === 'loading' && <Loading /> }
                    { page === 'fail' && <Fail /> }
                    { page === 'empty' && <NoResult text="알림 매물이 없습니다." /> }
                    { page === 'success' && 
                        <CenterList 
                            type={ "sub" } 
                            centers={ alarms }
                        />
                    }
                </Section>
            }
        </div>
    )
}

export default UserAlarmContainer;