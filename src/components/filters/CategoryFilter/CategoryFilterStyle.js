import styled from 'styled-components';

export const CategoryForm = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 390px;
    height: 48px;
    padding: 16px 30px;
    margin-bottom: 16px;
    background-color: #fff;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);

    &.mobile {
        position: fixed;
        flex-direction: column;
        gap: 10px;
        top: 96px;
        left: 14px;
        width: 32px;
        height: auto;
        padding: 0;
        background-color: transparent;
        box-shadow: none;
    }
`;

export const Category = styled.div`
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    label {
        color: ${ ({theme}) => theme.colors.gray800 };
    }

    input:checked + label {
        color: ${ ({theme}) => theme.colors.primary };
    }

    &.mobile {
        width: 32px;
        height: 32px;
        border-radius: 2px;
        box-shadow: 3px 3px 6px rgba(0,0,0,.06);

        label {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 32px;
            font-size: ${ ({theme}) => theme.fontSizes.xs };
        }

        input:checked + label {
            background-color: ${ ({theme}) => theme.colors.primary };
            color: #fff;
        }

    }
`;