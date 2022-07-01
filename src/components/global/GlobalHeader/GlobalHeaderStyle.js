import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import logoIcon from '../../../assets/images/logo/ico-bonoland.svg';
import calcIcon from '../../../assets/images/icon/ico-calculator.svg';

export const Header = styled.header`
    z-index: 40;
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 1240px;
    height: 80px;
    padding: 0 32px;
    background-color: #fff;
    box-shadow: 0 3px 3px rgba(0,0,0,.06);
`;

export const HomeLink = styled.button`
    z-index: 40;
    width: 195px;
    height: 38px;
    background: url(${ logoIcon }) center no-repeat;
`;

export const Menu = styled.div`
    z-index: 40;
    display: flex;
    gap: 120px;
    height: 100%;
`;

export const NavMenu = styled.nav`
    display: flex;
    gap: 0;
`;

export const Nav = styled.div`
    margin-left: -1px;
    padding: 32px 40px;
    background-color: '#fff';

    a {
        color: ${ ({ theme }) => theme.colors.gray900 };
    }
    button {
        background-color: #fff;
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
    padding: 0 22px;
    font-size: 14px;
    border: 0;
    background: #fff;
    border-radius: 2px;
    line-height: 46px;

    &.highlight {
        background-color: ${({ theme }) => theme.colors.primaryD };
        color: #fff;
    }
`
export const Calculate = styled.button`
    width: 140px;
    height: 46px;
    line-height: 46px;
    padding: 0 0 0 44px;
    background: url(${ calcIcon }) 20px center / 24px 24px no-repeat;
    border: 1px solid ${({ theme }) => theme.colors.gray300 };
    border-radius: 2px;
    color: ${({ theme }) => theme.colors.primaryD };
    font-size: ${({theme}) => theme.fontSizes.s}
`;
