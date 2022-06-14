import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.div`
    display: flex;
    height: 48px;
    flex-wrap: wrap;
`;

export const MoreLink = styled(Link)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: 3px 3px 3px rgba(0,0,0,.06);
    background-color: #fff;
    color: ${ ({ theme }) => theme.colors.primary };
    
    &:nth-child(n + 1) {
        border-right:1px solid ${({theme}) => theme.colors.gray300 }
    }
`;