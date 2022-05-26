import styled from 'styled-components';

export const Tab = styled.div`
    display: block;
    height: 100%;
`;

export const TabNavs = styled.div`
    display: flex;
    gap: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #fff;
    .tabNav{
        flex: 1;
        background-color: ${({theme}) => theme.colors.gray100 };
        &.on {
            background-color: #fff;
        }
    }
`;

export const TabConts = styled.div`
    display: block;
    height: 100%;

    .tabCont {
        display: none;
        height: calc(100% - 194px);

        .mobile & {
            height: calc(100% - 48px);
        }
        &.on {
            display: block;
        }
    }
`;

