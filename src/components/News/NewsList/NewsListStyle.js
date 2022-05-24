import styled from 'styled-components';
import { module } from '../../../themes/module';

export const List = styled(module.scrollWrapper)`
    height: calc(100% - 56px);

    hr {
        display: block;
        width: 100%;
        height: 10px;
        border: 0;
        background-color: ${ ({theme}) => theme.colors.gray100 };
    }
`;
