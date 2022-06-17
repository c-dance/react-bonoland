import UserAlarmForm from '../../components/User/UserAlarmForm/UserAlarmForm';
import Section from '../../components/ui/Section/Section';
import React, { useState, useEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deactivateAlarm } from '../../store/actions/mode';
import { Regions } from '../../sheme/alarm';

const UserAlarmFormContainer = () => {

    const dispatch = useDispatch();

    const [ data, setData ] = useState(new Object(Regions));

    const onFormSubtmit = () => {
        console.log(data);
        // 데이터 전송
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