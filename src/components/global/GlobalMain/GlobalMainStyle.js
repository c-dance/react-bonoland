import styled from 'styled-components';

export const Main = styled.main`
    z-index: 20;
    position: relative;
    width: 100%;
    max-width: ${ props => props.device === "pc"? "1240px" : "100%"};
`;