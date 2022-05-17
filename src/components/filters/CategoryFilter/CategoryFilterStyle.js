import styled from 'styled-components';

export const CategoryForm = styled.div`
    display: flex;
    width: 390px;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    padding: 16px 30px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
`;

export const Category = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    label {
        font-size: 16px;
        color: ${ props => props.theme.colors.gray800 };
    }

    input:checked + label {
        color: ${ props => props.theme.colors.primary };
    }
`;