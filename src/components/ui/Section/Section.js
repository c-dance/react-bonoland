import { Section as SectionBlock, Title, Body, Close, Back, Action } from './SectionStyle';

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
    return(
        <SectionBlock>
            <Title themeColor={ themeColor }>{ title }</Title>
            { back && 
                <Back 
                    icon={ !backText && true }
                    themeColor={ themeColor } 
                    onClick={ () => onBackClick() }
                    >{ backText && backText }</Back> 
            }
            { close && <Close themeColor={ themeColor } onClick={ () => onCloseClick() }></Close> }
            <Body className={ action? '' : 'full' }>
                { children }
            </Body>
            { action && <Action onClick={ () => onActionClick() }  themeColor={ themeColor }>{ actionText }</Action> }
        </SectionBlock>
    )
}

export default Section;