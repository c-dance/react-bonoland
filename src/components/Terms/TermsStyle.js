import styled from 'styled-components';
import { module } from '../../theme';

export const Tab = styled.div`
    
`;

export const TabHead = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1448px;
    height: 120px;
    padding: 0 24px;

    &::after {
        position: absolute;
        top: 120px;
        left: 0;
        width: 100%;
        height: 1px; 
        content: '';
        background-color: ${({theme}) => theme.colors.primary };
    }

    a {

    }

    h2 {
        display: none;
    }
`;

export const TabNavs = styled.div`
    display: flex;
    gap: 80px;

    span {
        flex: 1;
        &.active {

        }
    }
`;

export const TabConts = styled.div`
    width: 100%;
    max-width: 1448px;
    margin: 0 auto;
    padding: 200px 24px 220px;
    height: auto;

    div {
        &.active {

        }
    }
`;