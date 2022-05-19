import styled from 'styled-components';
import PrimaryCloseIcon from '../../../assets/images/icon/ico-x.svg';
import secondaryCloseIcon from '../../../assets/images/icon/ico-x_white.svg';
import secondaryBackIcon from '../../../assets/images/icon/ico-back_white.svg';

export const Section = styled.section`
    z-index: 30;
    position: fixed;
    top: 82px;
    right: 0;
    width: 390px;
    height: calc(100% - 82px);
    background-color: #fff;
    box-shadow: -3px 0 6px rgba(0,0,0, .06); 
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

    &.full { height: calc(100% - 56px); }
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
`;

export const Close = styled.div`
    position: absolute;
    top: 16px;
    right: 24px;
    width: 24px;
    height: 24px;
    background: url(${ props =>
        props.themeColor === "primary" && PrimaryCloseIcon
        || props.themeColor === "secondary" && secondaryCloseIcon
    }) center no-repeat;
`;

export const Back = styled.div`
    position: absolute;
    top: ${ props => props.icon? '16px' : '22px' };;
    left: 24px;
    width: ${ props => props.icon? '24px' : 'auto' };
    height: 24px;
    font-size: ${ ({theme}) => theme.fontSizes.s };
    color: ${ ({theme}) => theme.colors.gray600 };
    background:${ props =>
        props.icon? `url(${secondaryBackIcon}) center no-repeat`
        : '#fff'
    };
`;