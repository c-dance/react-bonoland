import styled from 'styled-components';
import { module } from '../../../theme';

export const CardList = styled(module.scrollWrapper)`
    height: 100%;
    padding: 0 16px 0 24px;
    overflow: scroll; 
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
`;

export const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
`;

export const CardDivider = styled.hr`
    display: block;
    border: 0;
    border-top: 1px solid ${ props => props.theme.colors.gray200 };
`;