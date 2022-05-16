import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    height: 80px;
    box-shadow: 0 3px 3px rgba(0,0,0,.06);
`;

export const HomeLink = styled(Link)`
    width: 195px;
    height: 38px;
`;

export const Menu = styled.div`
    display: flex;
    gap: 150px;
`;

export const NavMenu = styled.nav`
    display: flex;
    gap: 0;
`;

export const Nav = styled.div`
    margin-left: -1px;
    padding: 32px 40px;
    background-color: ${ props => props.theme === 'accent'? '#BD9369' : '#fff' };
    a {
        text-decoration: none; 
        color: ${ props => props.theme === 'accent'? '#fff' : '#212121' };
    }
`; 

export const UtilMenu = styled.div`

    .hello {

    }

    .btn {
        &.signup-btn
    }
`;

export const Calculate = styled.button`
    width: 140px;
    height: 46px;
    padding: 16px 0 16px 55px;
    background: url() 24px center / 24px 24px no-repeat;
`;