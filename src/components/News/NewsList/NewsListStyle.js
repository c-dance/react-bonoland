import styled from 'styled-components';
import { module } from '../../../themes/module';

export const List = styled(module.scrollWrapper)`
    height: 100%;

    hr {
        display: block;
        width: 100%;
        height: 10px;
        border: 0;
        background-color: ${ ({theme}) => theme.colors.gray100 };
    }
`;


