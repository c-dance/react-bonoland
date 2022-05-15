import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const AppStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

`;

export default AppStyle;