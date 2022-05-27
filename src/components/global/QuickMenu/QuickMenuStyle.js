import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import userIcon from '../../../assets/images/menu/ico-man.svg';
import alarmIcon from '../../../assets/images/menu/ico-bell.svg';
import calcIcon from '../../../assets/images/menu/ico-calculator.svg';

const quickCSS = css`
    z-index: 30;
    position: fixed;
    right: 32px;
    width: 38px;
    height: 38px;
    padding: 0;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    background-color: #fff;
    color: ${ props => props.theme.colors.gray700 };
    font-size: ${({theme}) => theme.fontSizes.xs };
    line-height: 38px;
    text-align: center;
    white-space: nowrap;

    &.user {
        top: 104px;
        font-size: 0;
        background: url(${userIcon}) center no-repeat #fff;
    }
    &.alarm {
        top: 154px;
        font-size: 0;
        background: url(${alarmIcon}) center no-repeat #fff;
    }
    &.chart {
        top: 342px;
        .mobile & { top: 138px; }
    }
    &.news {
        top: 392px;
        .mobile & { top: 222px; }
    }
    &.calc {
        top: 264px;
        font-size: 0;
        background: url(${calcIcon}) center no-repeat #fff;
    }
    .mobile & {
        right: 14px;
        width: 32px; 
        height: 32px; 
        line-height: 32px;
    }
    &.on {
        background-color: ${ ({theme}) => theme.colors.primary };
        color: #fff;
    }
`;

export const QuickLink = styled(Link)`
    ${ quickCSS }
`;

export const QuickBtn = styled.button`
    ${ quickCSS }
`