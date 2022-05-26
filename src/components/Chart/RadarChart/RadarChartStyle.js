import styled from 'styled-components';

export const ChartWrap = styled.div`
    position: relative;
`;

export const Average = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    border: 4px solid #001F60;
    font-size: ${ ({theme}) => theme.fontSizes.xl };
    font-weight: ${ ({theme}) => theme.fontWeights.bold };
`;
