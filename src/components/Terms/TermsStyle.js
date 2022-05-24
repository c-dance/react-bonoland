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

        @media ${ ({theme}) => theme.device.tablet } { 
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

            @media ${ ({theme}) => theme.device.tablet } { display: none; }
        }
    }

    main {
        width: 100%;
        max-width: 1448px;
        margin: 0 auto;
        padding: 200px 24px 220px;
        height: auto;

        @media ${ ({theme}) => theme.device.tablet } { 
            padding: 144px 24px 100px;
        }

    }
    
`;

export const Logo = styled.div`
    width: 195px;
    height: 38px;
    background: url(${logoIcon}) center no-repeat;

    @media ${ ({theme}) => theme.device.tablet } { 
        display: none;
    }
`;

export const TabNavs = styled.div`
    display: flex;
    gap: 80px;

    @media ${ ({theme}) => theme.device.tablet } { 
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

        @media ${ ({theme}) => theme.device.tablet } {
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
                border-bottom: 1px solid ${ ({theme}) => theme.colors.primary };
            }
        }

        .pc {
            @media ${ ({theme}) => theme.device.tablet } { 
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

        @media ${ ({theme}) => theme.device.tablet } { 
            font-size: ${ ({theme}) => theme.fontSizes.s };
        }

        &.active {
            display: block;
        }
    }
`;