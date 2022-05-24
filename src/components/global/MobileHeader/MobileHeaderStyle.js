import styled from 'styled-components';
import backIcon from '../../../assets/images/icon/ico-back_dark.svg';

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
`;

export const Title = styled.h2`
    font-size: ${ ({theme}) => theme.fontSizes.l };
    font-weight: ${ ({theme}) => theme.fontWeights.medium };
    text-align: center;
    line-height: 56px;
`;

export const Back = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 16px;
    height: 16px;
    background: url(${backIcon}) center no-repeat;
`;