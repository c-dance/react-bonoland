import styled from 'styled-components';

export const ChartBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:auto;
    padding: 20px;
    width: ${ props => 
        props.type === "main"?
        "270px"
        : "100%"
    };
    background-color: ${ props => 
        props.type === "main"? 
        'rgba(0, 0, 54, 0.9);' 
        : props.theme.colors.secondary
    };
`;