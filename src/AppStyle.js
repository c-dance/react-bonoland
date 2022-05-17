import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const AppStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html, 
    body,
    #root {
        width: 100%;
        height: 100%;
    }

    a {
        text-decoration: none;
        color: #000;
    }
    
    button {
        outline: none;
        border: 0;
    }

    input,
    input:focus,
    input:active {
        border: 0;
        outline: 0;
    }
`;

export default AppStyle;