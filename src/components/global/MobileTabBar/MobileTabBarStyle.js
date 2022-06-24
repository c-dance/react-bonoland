import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import salesIcon from '../../../assets/images/menu/ico-blocks.svg';
import rcmdIcon from '../../../assets/images/menu/ico-thumbup.svg';
import registerIcon from '../../../assets/images/menu/ico-docs.svg';
import contactIcon from '../../../assets/images/menu/ico-chat.svg';
import userIcon from '../../../assets/images/menu/ico-user.svg';

export const TabBar = styled.nav`
    z-index: 31;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    background-color: #fff;
    box-shadow: -3px 0 6px rgba(0,0,0,.06);

    ul {
        display: flex;
        width: 100%;

        li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

const TabBtnCss = css`
    width: auto;
    height: 100%;
    padding-top: 36px;
    background: url(${ props => (
            props.icon === "sales" && salesIcon 
        || props.icon === "rcmd" && rcmdIcon 
        || props.icon === "register" && registerIcon
        || props.icon === "contact" && contactIcon
        || props.icon === "user" && userIcon
        )
    }) center 9px / 24px 24px no-repeat;
    font-size: 10px;
    font-weight: ${ props => props.theme.fontWeights.regular };
    color: ${ props => props.theme.colors.gray700 };
`

export const TabLink = styled(Link)`
    ${ TabBtnCss }
`;
export const TabBtn = styled.button`
    ${ TabBtnCss }
    padding-top: 28px;
`;