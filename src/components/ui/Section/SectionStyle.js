import styled from 'styled-components';
import primaryCloseIcon from '../../../assets/images/icon/ico-x.svg';
import primaryBackIcon from '../../../assets/images/icon/ico-back_dark.svg';
import secondaryCloseIcon from '../../../assets/images/icon/ico-x_white.svg';
import secondaryBackIcon from '../../../assets/images/icon/ico-back_white.svg';
import secondaryArrowBackIcon from '../../../assets/images/icon/ico-arrowback_white.svg';
import { module } from '../../../themes/module';

export const Section = styled.section`
    z-index: 30;
    position: fixed;
    top: 80px;
    right: 0;
    width: 390px;
    height: calc(100% - 80px);
    background-color: #fff;
    box-shadow: -3px 0 6px rgba(0,0,0, .06); 

    .mobile & {
        z-index: 40;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

export const Title = styled.h2`
    width: 100%;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background-color: ${ props => props.themeColor === 'primary'? '#fff' : props.theme.colors.secondary };
    color: ${ props => props.themeColor === 'primary'? props.theme.colors.gray900 : '#fff' };
    font-size: ${ props => props.theme.fontSizes.l };
    font-weight: ${ props => props.theme.fontWeights.medium };
`;

export const Body = styled.div`
    width: 100%;
    height: calc(100% - 102px);

    &.full { 
        height: calc(100% - 56px); 
    }

    .mobile & {
        height: calc(100% - 56px); 
    }
`;

export const Action = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 56px;
    line-height: 56px;
    text-align: center;
    cursor: pointer;
    background-color: ${ props => props.themeColor === 'primary'? props.theme.colors.primary : props.theme.colors.secondary };
    ${'' /* color: ${ props => props.themeColor === 'primary'? props.theme.colors.primary : '#fff' }; */}
    color: #fff;

    .mobile & {
        position: fixed;
    }
`;

export const Close = styled.div`
    position: absolute;
    top: 16px;
    right: 24px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: url(${ props =>
        props.themeColor === "primary" && primaryCloseIcon
        || props.themeColor === "secondary" && secondaryCloseIcon
    }) center no-repeat;

    .mobile & {
        top: 16px;
        right: 16px;
    }
`;

export const Back = styled.div`
    position: absolute;
    top: 22px;
    left: 24px;
    width: auto;
    height: 24px;
    line-height: 24px;
    font-size: ${ ({theme}) => theme.fontSizes.s };
    cursor: pointer;
    color: ${ props =>
        props.themeColor === "primary"?
        props.theme.colors.gray600 
        :'#ffff'
    };
    background-color: transparent;

    &.ico-primary { top: 16px; width: 24px; background: url(${primaryBackIcon}) center no-repeat; }
    &.ico-secondary { top: 16px; width: 24px; background: url(${secondaryBackIcon}) center no-repeat; }

    .mobile & {
        top: 16px;
        left: 16px;
        line-height: 24px;
        background-color: transparent;
        &.ico-primary { background: url(${primaryBackIcon}) center no-repeat; }
        &.ico-secondary { background: url(${secondaryArrowBackIcon}) center no-repeat; }
    }
`;