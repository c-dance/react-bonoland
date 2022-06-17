import UserAlarmForm from '../../components/User/UserAlarmForm/UserAlarmForm';
import Section from '../../components/ui/Section/Section';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateAlarm } from '../../store/actions/mode';
import { Regions } from '../../sheme/alarm';
import { setUserLocalAlarm } from '../../api/user';

const UserAlarmFormContainer = () => {

    const dispatch = useDispatch();

    const [ data, setData ] = useState(new Object(Regions));

    const onFormSubtmit = async () => {
        console.log(data);
        const alaramData = {
            userEmail: useSelector(state => state.User.userInfo.id),
            sidos: [],
            gyeonggidos: []
        };

        // const RESPONSE = await setUserLocalAlarm(alaramData);
        // if(RESPONSE) {
        //     //알람 세팅 완료
        // } else {
        //     //알람 세팅 실패
        // }
    };

    const onFormChange = (key, idx, value) => {
        const newData = new Object(data);
        newData[key][idx].value = value;
        setData(newData); 
    };

    useEffect(() => {
        // 유저 값 가져오기
        setData(new Object(Regions));
    }, []);

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
                form={ data }
                onFormChange={ onFormChange }
            />
        </Section>
    )
};

export default UserAlarmFormContainer;