import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px 24px 0;
    height: auto;

    hr {
        display: block;
        width: 100%;
        height: 1px;
        margin: 20px 0;
        border: 1px solid ${({theme}) => theme.colors.gray200 };
        border-width: 1px 0 0;
    }
`;

export const InputWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;

    label {
        width: 100px;
        line-height: 44px;
        font-weight: ${ ({theme}) => theme.fontWeights.medium };
    }
    input {
        width: calc(100% - 100px);
        border-radius: 2px;
        &:disabled {
            border: 0;
        }
    }

    button {
        position: absolute;
        top: 12px;
        right: 0;
        background-color: transparent;
        color: ${({theme}) => theme.colors.blue };
        font-size: ${ ({theme}) => theme.fontSizes.s }; 
    }

    &.cols {
        flex-direction: column;
        gap: 12px;

        label, input { 
            width: 100%; 
            line-height: 1;
        }
    }
`;

export const Unsubscribe = styled.div`
    padding: 32px 0 20px;
    text-align: center;

    .mobile & {
        padding-bottom: 76px;
    }
    button {
        text-decoration: underline;
        background: transparent;
        color: ${({theme}) => theme.colors.gray600 };
        font-size: ${ ({theme}) => theme.fontSizes.s };
    }
`;
