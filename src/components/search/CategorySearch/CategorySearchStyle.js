import styled from 'styled-components';

export const CategoryForm = styled.div`
    display: flex;
    width: 390px;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    padding: 16px 30px;
`;

export const Category = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    label {

    }
`;