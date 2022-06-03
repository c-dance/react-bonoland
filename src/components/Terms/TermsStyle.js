import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoIcon from '../../assets/images/logo/ico-bonoland.svg';

export const Tab = styled.div`
    header {
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
        background-color: #fff;

        .mobile & { 
            top: 56px;
            height: 48px;
            padding: 0;
            box-shadow: 0 3px 6px rgba(0,0,0,.06);
        }

        &::after {
            position: fixed;
            top: 120px;
            left: 0;
            width: 100%;
            height: 1px; 
            content: '';
            background-color: ${({theme}) => theme.colors.primary };

            .mobile & { display: none; }
        }
    }

    main {
        width: 100%;
        max-width: 1448px;
        margin: 0 auto;
        padding: 200px 24px 220px;
        height: auto;

        .mobile &  { 
            padding: 144px 24px 100px;
        }

    }
    
`;

export const Logo = styled(Link)`
    width: 195px;
    height: 38px;
    background: url(${logoIcon}) center no-repeat;

    .mobile &  { 
        display: none;
    }
`;

export const TabNavs = styled.div`
    display: flex;
    gap: 80px;

    .mobile &  { 
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 0;
    }

    div {
        flex: 1;
        white-space: nowrap;
        color: ${ ({theme}) => theme.colors.gray600 };
        font-weight: ${({theme}) => theme.fontWeights.medium };
        text-align: center;

        .mobile &  {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            gap: 0;
            font-size: ${ ({theme}) => theme.fontSizes.s };
        }

        &.active {
            color: ${ ({theme}) => theme.colors.gray900 };
            @media ${ ({theme}) => theme.device.tablet } { 
                height: 100%;
                color: ${ ({theme}) => theme.colors.primary };
                border-bottom: 2px solid ${ ({theme}) => theme.colors.primary };
            }
        }

        .mobile &  { 
            .pc {
                display: none;
            }
        }
    }
`;

export const TabConts = styled.div`

    div {
        display: none;
        line-height: 1.7;
        color: ${ ({theme}) => theme.colors.gray800 };
        font-size: ${ ({theme}) => theme.fontSizes.s };

        .mobile &  { 
            font-size: ${ ({theme}) => theme.fontSizes.s };
        }

        &.active {
            display: block;
        }
    }
`;