import styled from 'styled-components';

export const ChartBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:auto;
    padding: 20px;
    background-color: ${({theme}) => theme.colors.secondary };
`;