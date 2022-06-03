import { Header, Title, Back } from './MobileHeaderStyle';
import { useNavigate } from 'react-router';
import React from "react";

const MobileHeader = ({ title, onBackClick }) => {
    const navigate = useNavigate();

    return (
        <Header>
            <Back 
                onClick={ () => { onBackClick? onBackClick() : navigate(-1) }}
            />
            <Title>{ title }</Title>
        </Header>
    )
};

export default MobileHeader;