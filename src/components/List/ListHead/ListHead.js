import { Head, Wrap, Title, Back, Alarm } from './ListHeadStyle';
import React from "react";
import { useDispatch } from 'react-redux';
import { activateAlarm } from '../../../store/actions/mode';

const ListHeader = ({ title, children }) => {

    const dispatch = useDispatch();

    return (
        <Head>
            <Back to="/"></Back>
            <Alarm onClick={ () => { dispatch(activateAlarm()) } }>지역알림</Alarm>
            <Title>{ title }</Title>
            <Wrap>
                { children }
            </Wrap>
        </Head>
    )
};

export default ListHeader;