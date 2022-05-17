import styled from 'styled-components';

export const CardList = styled.div`
    height: 100%;
    overflow: scroll; 
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