import { Section, Title, Body, Close, Back, Action } from './SideSectionStyle';

const SideSection = ({ 
    title,
    themeColor,
    close,
    clickClose,
    back, 
    clickBack,
    action,
    actionText,
    clickAction,
    children
 }) => {
    return(
        <Section>
            <Title themeColor={ themeColor }>{ title }</Title>
            { back && <Back themeColor={ themeColor } onClick={() => clickBack }></Back> }
            { close && <Close themeColor={ themeColor } onClick={ () => clickClose() }></Close> }
            <Body className={ action? '' : 'full' }>
                { children }
            </Body>
            { action && <Action onClick={ () => clickAction() }  themeColor={ themeColor }>{ actionText }</Action> }
        </Section>
    )
}

export default SideSection;