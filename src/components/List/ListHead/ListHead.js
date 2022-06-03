import { Head, Wrap, Title, Back, Alarm } from './ListHeadStyle';
import React from "react";

const ListHeader = ({ title, children }) => {
    return (
        <Head>
            <Back to="/"></Back>
            <Alarm>지역알림</Alarm>
            <Title>{ title }</Title>
            <Wrap>
                { children }
            </Wrap>
        </Head>
    )
};

export default ListHeader;