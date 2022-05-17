import styled from 'styled-components';
import { Link } from 'react-router-dom';
import salesIcon from '../../../assets/images/menu/ico-blocks.svg';
import rcmdIcon from '../../../assets/images/menu/ico-thumbup.svg';
import registerIcon from '../../../assets/images/menu/ico-docs.svg';
import contactIcon from '../../../assets/images/menu/ico-chat.svg';
import userIcon from '../../../assets/images/menu/ico-user.svg';

export const TabBar = styled.nav`
    z-index: 30;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    box-shadow: -3px 0 6px rgba(0,0,0,.06);

    display: none;
    @media ${({ theme }) => theme.device.tablet } {
        display: flex;
    }

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

export const TabBtn = styled(Link)`
    width: auto;
    height: 100%;
    padding-top: 36px;
    background: url(${ props => (
            props.sales && salesIcon 
        || props.rcmd && rcmdIcon 
        || props.register && registerIcon
        || props.contact && contactIcon
        || props.user && userIcon
        )
    }) center 9px / 24px 24px no-repeat;
    font-size: 10px;
    color: ${ props => props.theme.colors.gray700 };
`;