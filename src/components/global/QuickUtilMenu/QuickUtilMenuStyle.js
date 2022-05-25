import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import userIcon from '../../../assets/images/menu/ico-man.svg';
import alarmIcon from '../../../assets/images/menu/ico-bell.svg';
import calcIcon from '../../../assets/images/menu/ico-calculator.svg';

const quickCSS = css`
    position: fixed;
    right: 32px;
    width: 38px;
    height: 38px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    display: ${ props => props.display==="mobile"? 'none' : 'block' };
    top: ${ props => (
        props.icon === "user" && `104px`
        || props.icon === "alarm" && `154px`
        || props.icon ==="news" && `392px`
        || props.icon ==="calc" && `264px`
    )};
    background: url(${ props => (
        props.icon === "user"&& userIcon
        || props.icon === "alarm" && alarmIcon
        || props.icon ==="calc" && calcIcon
        )
    }) center no-repeat;
    color: ${ props => props.theme.colors.gray700 };
    font-size: ${ props => props.icon === "news"? `12px` : `0` };
    line-height: 38px;
    text-align: center;

    @media ${({ theme }) => theme.device.tablet} {
        right: 14px;
        display: ${ props => (
            props.display === "pc" && `none`
            || props.display ==="mobile" && 'block'
        )};
        top: ${ props => props.icon ==="news" && `222px`};
    }
`;

export const QuickLink = styled(Link)`
    ${ quickCSS }
`;

export const QuickBtn = styled.button`
    ${ quickCSS }
`