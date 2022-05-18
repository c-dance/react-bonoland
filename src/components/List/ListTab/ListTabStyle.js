import styled from 'styled-components';
import { module } from '../../../theme';

export const TabNavs = styled.div`
    display: flex;
    gap: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    .tabNav{
        flex: 1;
        background-color: ${({theme}) => theme.colors.gray100 };
        &.on {
            background-color: #fff;
        }
    }
`;

export const TabConts = styled(module.scrollWrapper)`
    display: block;
    height: calc(100% - 140px);
    .tabCont {
        display: none;
        &.on {
            display: block;
        }
    }
`;

