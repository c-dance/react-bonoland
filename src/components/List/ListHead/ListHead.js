import { Head, Wrap, Title, Back, Alarm } from './ListHeadStyle';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { activateAlarm, activateLoginRequired } from '../../../store/actions/mode';

const ListHeader = ({ title, children }) => {

    const dispatch = useDispatch();
    const USER_LOGGEDIN = useSelector(state => state.User.loggedIn);

    const onAlarmClick = () => {
        if(USER_LOGGEDIN) dispatch(activateAlarm()); 
        else dispatch(activateLoginRequired());
    }

    return (
        <Head>
            <Back to="/"></Back>
            <Alarm 
                onClick={ () => { onAlarmClick() } }
            >지역알림</Alarm>
            <Title>{ title }</Title>
            <Wrap>
                { children }
            </Wrap>
        </Head>
    )
};

export default ListHeader;