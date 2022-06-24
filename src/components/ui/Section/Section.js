import { Section as SectionBlock, Title, Body, Close, Back, Option, Action } from './SectionStyle';
import { useNavigate } from 'react-router';
import React from "react";

const Section = ({ 
    title,
    themeColor,
    close,
    onCloseClick,
    back, 
    onBackClick,
    option, 
    optionText,
    onOptionClick,
    action,
    actionText,
    onActionClick,
    children
 }) => {

    const navigate = useNavigate();
    const goBack = () => { navigate(-1); };

    console.log(option);

    return(
        <SectionBlock>
            <Title themeColor={ themeColor }>{ title }</Title>
            { back && 
                <Back  
                    className={`ico-${themeColor}`}
                    onClick={ () => {
                        onBackClick? onBackClick() : goBack()
                    }}
                />
            }
            { close && 
                <Close 
                    themeColor={ themeColor } 
                    onClick={ () => {
                        onCloseClick? onCloseClick() : goBack()
                    } }
                /> 
            }
            { option && 
                <Option 
                    onClick={ () => onOptionClick() }
                >{ optionText }</Option>
            }
            <Body className={ action? '' : 'full' }>
                { children }
            </Body>
            { action && <Action onClick={ () => onActionClick() }  themeColor={ themeColor }>{ actionText }</Action> }
        </SectionBlock>
    )
}

export default Section;