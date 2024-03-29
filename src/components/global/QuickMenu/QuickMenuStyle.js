import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import userIcon from '../../../assets/images/menu/ico-man.svg';
import userOnIcon from '../../../assets/images/menu/ico-man_white.svg';
import alarmIcon from '../../../assets/images/menu/ico-bell.svg';
import alarmActiveIcon from '../../../assets/images/menu/ico-bell_white.svg';
import calcIcon from '../../../assets/images/menu/ico-calculator.svg';
import cadIcon from '../../../assets/images/menu/ico-cadastral.svg';
import locIcon from '../../../assets/images/menu/ico-location.svg';
import locActiveIcon from '../../../assets/images/menu/ico-location_active.svg';

const quickCSS = css`
    z-index: 30;
    position: fixed;
    right: 32px;
    width: 38px;
    height: 38px;
    padding: 0;
    border-radius: 2px;
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
        &.on {
            background: url(${userOnIcon}) center no-repeat ${({theme}) => theme.colors.primary };
        }
        .mobile & {
            top: 10px;
        }
    }
    &.alarm {
        top: 154px;
        font-size: 0;
        background: url(${alarmIcon}) center no-repeat #fff;
        &:hover {
            background: url(${alarmActiveIcon}) center no-repeat ${({theme}) => theme.colors.primary };
        }
        &.on {
        }
    }
    &.chart {
        top: 342px;
        .mobile & { 
            top: 138px; 
            &.on {
                background-color: #fff;
                color: ${ props => props.theme.colors.gray700 };
                &::after {
                    position: absolute;
                    top: 3px;
                    right: 3px; 
                    content: '';
                    width: 4px;
                    height: 4px;
                    border-radius: 2px;
                    background-color: #FF0000;
                }
            }
        }
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
    &.cad {
        top: 442px;
        font-size: 0;
        background: url(${cadIcon}) center no-repeat #fff;
        .mobile & { top: 180px; }
    }
    &.location {
        top: 292px;
        font-size: 0;
        background: url(${locIcon}) center no-repeat #fff;
        &.active { background: url(${locActiveIcon}) center no-repeat #fff; }
        .mobile & { top: 96px; }
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