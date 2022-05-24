import styled from 'styled-components';
import { module } from '../../../themes/module';

export const CardList = styled(module.scrollWrapper)`
    height: ${ props => props.type === "main" ? '720px' : '100%' };
    max-height: ${ props => props.type === "main" ? 'calc(100% - 176px)' : '100%' };
    padding: 0 16px 0 24px;
    overflow-x: hidden;
    overflow-y: scroll; 
    background-color: #fff;
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