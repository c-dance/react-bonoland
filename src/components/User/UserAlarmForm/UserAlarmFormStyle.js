import styled from 'styled-components';
import { module } from '../../../themes/module';
import defualtCheckIcon from '../../../assets/images/form/ico-checkbox_default.svg';
import checkedCheckIcon from '../../../assets/images/form/ico-checkbox_checked.svg';
import accordionIcon from '../../../assets/images/form/ico-accordion_black.svg';

export const AlarmWrap = styled(module.scrollWrapper)`
    height: 100%;
    overflow-y: hidden;

    .mobile & {
        height: calc(100% - 56px);
        overflow-y: auto;
    }
`;

export const AlarmForm = styled.div`
    height: 100%;
    
    hr {
        width: 100%;
        height: 10px;
        border: 0;
        background-color: ${ ({theme}) => theme.colors.gray100 };
        .mobile & {
            display: none;
        }
    }

    .mobile & {
        height: calc(100% - 56px);
    }
`;

export const Head = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px;

    .mobile & {
        gap: 8px;
    }

    h2 {
        font-size: ${ ({theme}) => theme.fontSizes.l };
    }

    p {
        font-size: ${ ({theme}) => theme.fontSizes.s };
        line-height: 1.7;
    }
`;

export const Body = styled(module.scrollWrapper)`
    height: calc(100% - 180px);

    .mobile &  {
        height: auto;
        overflow-y: hidden;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 24px;

        fieldset {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            width: 100%;
        }
    }

`;

export const CheckWrap = styled.div`
    position: relative;
    width: calc(50% - 6px);

    input { 
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    label {
        padding-left: 22px;
        background: url(${ defualtCheckIcon }) left center no-repeat;
    }

    input:checked + label {
        background: url(${ checkedCheckIcon }) left center no-repeat;
    }
`;

export const CheckBox = styled.div`
    position: relative;
    width: calc(50% - 6px);
    height: 40px;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    label {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 40px;
        text-align: center;
        font-size: ${ ({theme}) => theme.fontSizes.s };
    }

    input.highlight + label,
    input:checked + label {
        background-color: ${ ({theme}) => theme.colors.primary };
        color: #fff;
    }
`;

export const Accordion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: auto;
`;

export const AccordionSummary = styled.div`
    width: 100%;
    heigth: 40px;
    border-radius: 2px;
    background: url(${ accordionIcon }) calc(100% - 36px) center no-repeat;

    > div {
        width: 100%;
    }
`;
export const AccordionDetails = styled.div`
    width: 100%;
    height: ${ props => props.active? '220px' : '0px' };
    transition: height .3s;
    overflow: hidden;

    fieldset {
        padding: 15px 0;
        gap: 30px 12px !important;
    }
    
`;