import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';

export const ChartBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:auto;
    padding: 20px;
    width: ${ props => 
        (props.type === "main" && isBrowser )?
        "270px"
        : "100%"
    };
    background-color: ${ props => 
        props.type === "main"? 
        'rgba(0, 0, 54, 0.9);' 
        : props.theme.colors.secondary
    };

    canvas {
        max-width: 360px;
        max-height: 360px;
    }
`;