import styled from 'styled-components';

export const Region = styled.div`
    display: ${props => props.display };
    z-index: 11;
    position: fixed;
    top: 104px;
    left: 50%;
    transform: translateX(-50%);
    height: 46px;
    padding: 20px 24px;
    border-radius: 23px;
    background-color: #fff;
    font-size: 14px
`;