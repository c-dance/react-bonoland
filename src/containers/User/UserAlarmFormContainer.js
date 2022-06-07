import UserAlarmForm from '../../components/User/UserAlarmForm/UserAlarmForm';
import Section from '../../components/ui/Section/Section';
import React from 'react';
import { isBrowser } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { deactivateAlarm } from '../../store/actions/mode';

const UserAlarmFormContainer = () => {

    const dispatch = useDispatch();

    const onCloseClick = () => {
        dispatch(deactivateAlarm());
    };

    const onActionClick = () => {
        onCloseClick();
    }

    return (
        <Section
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ true }
            onCloseClick={ onCloseClick }
            action={ true }
            actionText={ "확인" }
            onActionClick={ onActionClick }
        >
            <UserAlarmForm />
        </Section>
    )
};

export default UserAlarmFormContainer;