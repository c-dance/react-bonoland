import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import logoIcon from '../../../assets/images/logo/ico-bonoland.svg';
import calcIcon from '../../../assets/images/icon/ico-calculator.svg';

export const Header = styled.header`
    z-index: 40;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 32px;
    box-shadow: 0 3px 3px rgba(0,0,0,.06);

    @media ${({ theme }) => theme.device.tablet} {
       display: none;
    }
`;

export const HomeLink = styled(Link)`
    width: 195px;
    height: 38px;
    background: url(${ logoIcon }) center no-repeat;
`;

export const Menu = styled.div`
    display: flex;
    gap: 150px;
    height: 100%;

    @media ${({ theme }) => theme.device.desktopL} {
       gap: 40px;
    }
`;

export const NavMenu = styled.nav`
    display: flex;
    gap: 0;
`;

export const Nav = styled.div`
    margin-left: -1px;
    padding: 32px 40px;
    background-color: '#fff';

    @media ${({ theme }) => theme.device.desktopM} {
       padding: 32px 20px;
    }

    a {
        color: ${ ({ theme }) => theme.colors.gray900 };
    }

    &.highlight { 
        background-color: ${({ theme }) => theme.colors.primary};
        a {
            color: #fff;
        }
    }
`; 

export const UtilMenu = styled.div`
    height: 100%;
    display: flex;
    justify-content: start;
    gap: 24px;
    align-items: center;
`;

export const Hello = styled.div`
    margin-right: 32px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray800 };
`;

export const Button = styled.button`
    width: auto;
    height: 46px;
    padding: 16px 22px;
    font-size: 14px;
    border: 0;
    background: #fff;
    border-radius: 2px;

    &.highlight {
        background-color: ${({ theme }) => theme.colors.primary };
        color: #fff;
    }
`
export const Calculate = styled(Button)`
    width: 140px;
    padding: 16px 0 16px 50px;
    background: url(${ calcIcon }) 20px center / 24px 24px no-repeat;
    border: 1px solid ${({ theme }) => theme.colors.gray400 };
    color: ${({ theme }) => theme.colors.primary };
    @media ${({ theme }) => theme.device.desktopS} {
       display: none;
    }
`;