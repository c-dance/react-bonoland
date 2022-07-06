import { Head, Wrap, Title, Back, Alarm } from './ListHeadStyle';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { activateLoginRequired } from '../../../store/actions/service';
import { activateMyAlarmForm } from '../../../store/actions/page';
import { useNavigate } from 'react-router-dom';
import { updateFilter } from '../../../store/actions/filter';

const ListHeader = ({ title, children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const USER_LOGGEDIN = useSelector(state => state.User.loggedIn);

    const onBackClick = () => {
        dispatch(updateFilter({}));
        navigate(-1)
    };

    const onAlarmClick = () => {
        if(USER_LOGGEDIN) dispatch(activateMyAlarmForm()); 
        else dispatch(activateLoginRequired());
    }

    return (
        <Head>
            <Back onClick={() => onBackClick()}></Back>
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