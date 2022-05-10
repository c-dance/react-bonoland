import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const AppStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: content-box;
    }

`;

export default AppStyle;