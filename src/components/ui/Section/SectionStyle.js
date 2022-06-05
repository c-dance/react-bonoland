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
    top: 82px;
    right: 0;
    width: 390px;
    height: calc(100% - 82px);
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
    background-color: ${ props => props.themeColor === 'primary'? '#fff' : props.theme.colors.secondary };
    color: ${ props => props.themeColor === 'primary'? props.theme.colors.primary : '#fff' };

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
    top: ${ props => props.icon? '16px' : '22px' };;
    left: 24px;
    width: ${ props => props.icon? '24px' : 'auto' };
    height: 24px;
    font-size: ${ ({theme}) => theme.fontSizes.s };
    color: ${ props =>
        props.themeColor === "primary"?
        props.theme.colors.gray600 
        :'#ffff'
    };
    background:${ props =>
        props.icon? 
        props.themeColor === "primary"? 
        `url(${primaryBackIcon}) center no-repeat`
        : `url(${secondaryBackIcon}) center no-repeat`
        : 'transparent'
    };

    .mobile & {
        top: 16px;
        left: 16px;
        background:${ props =>
            props.icon? 
            props.themeColor === "primary"? 
            `url(${primaryBackIcon}) center no-repeat`
            : `url(${secondaryArrowBackIcon}) center no-repeat`
            : 'transparent'
        };
    }
`;