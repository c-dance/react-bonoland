import styled from 'styled-components';

export const Tab = styled.div`
    display: block;
    height: 100%;

    .mobile & {
        height: calc(100vh - 134px);
    }
`;

export const TabNavs = styled.div`
    display: flex;
    gap: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #fff;

    .tabNav {
        
        flex: 1;
        background-color: ${({theme}) => theme.colors.gray100 };
        color:  ${({theme}) => theme.colors.gray500 };
        cursor: pointer;
        
        &.on {
            background-color: #fff;
            color: ${({theme}) => theme.colors.secondary };
        }
    }

    .full & {
        gap: 12px;
        padding: 0 24px 8px;
        line-height: 38px;

        .mobile & {
            line-height: 48px;
            gap: 0;
            padding: 0;
        }

        .tabNav {
            width: calc(50% - 12px);
            background-color: #fff;
            color:  ${({theme}) => theme.colors.gray700 };
            border: 1px solid ${({theme}) => theme.colors.gray300 };

            &.on {
                border: 0;
                background-color: ${({theme}) => theme.colors.gray200 };
                color: #fff;
            }

            .mobile & {
                border: 0;
                background-color: ${({theme}) => theme.colors.gray200 };
                color: ${({theme}) => theme.colors.gray500 };

                &.on {
                    background-color: #fff;
                    color: ${({theme}) => theme.colors.secondary };
                    font-weight: ${({theme}) => theme.fontWeights.medium };
                }
            }
        }
    }
`;

export const TabConts = styled.div`
    display: block;
    height: 100%;

    .mobile & {
        height: calc(100vh - 48px);
    }

    .tabCont {
        display: none;
        height: calc(100% - 194px);

        .full & ,
        .mobile & {
            height: calc(100% - 48px);
        }

        &.on {
            display: block;
        }
    }
`;

