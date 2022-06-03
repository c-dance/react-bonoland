import { Section, Header, Title, Back, Contents } from './MobileSectionStyle';
import { useNavigate } from 'react-router';
import React from "react";

const MobileSection = ({ title, onBackClick, children }) => {
    const navigate = useNavigate();

    return (
        <Section>
            <Header>
                <Back 
                    onClick={ () => { onBackClick? onBackClick() : navigate(-1) }}
                />
                <Title>{ title }</Title>
            </Header>
            <Contents>
                <div>
                    { children }
                </div>
            </Contents>
        </Section>
    )
};

export default MobileSection;