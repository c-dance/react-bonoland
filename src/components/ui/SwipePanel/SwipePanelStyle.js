import styled from 'styled-components';

export const SwipeArea = styled.div`
    z-index: 31;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: transparent;

    & + * {
        z-index: 30;
        position: relative;
    }
`;

export const SwipeBox = styled.div`
    z-index: 29;
    position: fixed;
    top: 45%;
    left: 0;
    width: 100%;
    height: 55vh;
    padding: 24px 0 56px;
    background-color: #fff;
    box-shadow: 0 0px 6px rgba(0,0,0,.12);
    transition: top .3s;

    &.hide {
        top: calc(100% - 96px);
    }
    
`;