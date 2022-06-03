import { Section as SectionBlock, Title, Body, Close, Back, Action } from './SectionStyle';
import { useNavigate } from 'react-router';
import React from "react";

const Section = ({ 
    title,
    themeColor,
    close,
    onCloseClick,
    back, 
    backText,
    onBackClick,
    action,
    actionText,
    onActionClick,
    children
 }) => {

    const navigate = useNavigate();
    const goBack = () => { navigate(-1); };

    return(
        <SectionBlock>
            <Title themeColor={ themeColor }>{ title }</Title>
            { back && 
                <Back 
                    icon={ !backText && true }
                    themeColor={ themeColor } 
                    onClick={ () => {
                        onBackClick? onBackClick() : goBack()
                    }}
                    >{ backText && backText }</Back> 
            }
            { close && 
                <Close 
                    themeColor={ themeColor } 
                    onClick={ () => {
                        onCloseClick? onCloseClick() : goBack()
                    } }></Close> 
            }
            <Body className={ action? '' : 'full' }>
                { children }
            </Body>
            { action && <Action onClick={ () => onActionClick() }  themeColor={ themeColor }>{ actionText }</Action> }
        </SectionBlock>
    )
}

export default Section;