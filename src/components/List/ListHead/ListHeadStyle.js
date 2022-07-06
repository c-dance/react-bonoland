import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backIcon from '../../../assets/images/icon/ico-back_white.svg';

export const Head = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    padding: 0 24px;
    background-color: ${ ({ theme }) => theme.colors.secondary };
`;

export const Wrap = styled.div`
    padding: 16px 0;
`;

export const Title = styled.h2`
    width: 100%;
    padding: 20px 0;
    font-size: ${ ({ theme }) => theme.fontSizes.l };
    font-weight: ${ ({ theme }) => theme.fontWeights.medium };
    color: #fff;
    text-align: center;
`;

export const Back = styled.button`
    position: absolute;
    top: 20px;
    left: 24px;
    width: 8px;
    height: 16px;
    background: url(${ backIcon }) center no-repeat;
`;

export const Alarm = styled.button`
    position: absolute;
    top: 20px;
    right: 24px;
    background-color: transparent;
    color: rgba(255,255,255,.7);
    font-size: ${ ({ theme }) => theme.fontSizes.s };
`;