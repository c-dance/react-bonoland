import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 40px 24px;
`;

export const Inform = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    h2 {
        font-size: 24px;
    }

    p {
        font-size: color: ${({theme}) => theme.fontSizes.xs };
        color: ${({theme}) => theme.colors.gray600 };
    }
`

export const Actions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    .btn {
        width: 100%;
        height: 52px;
        line-height: 50px;
        border: 1px solid ${({theme}) => theme.colors.primary };
        border-radius: 2px;
        color: ${({theme}) => theme.colors.primary };
        font-weight: ${({theme}) => theme.fontWeights.m };
        background-color: #fff;

        &.acc {
            background-color:${({theme}) => theme.colors.primary };
            color: #fff;
        }
    }

    .link {
        margin-top: 32px;
        text-decoration: underline;
        color: ${({theme}) => theme.colors.gray700 };
        font-size: color: ${({theme}) => theme.fontSizes.xs };
    }
`;
