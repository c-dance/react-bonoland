import styled from 'styled-components';
import closeIcon from '../../../assets/images/icon/ico-x.svg';

export const Window = styled.div`
    z-index: 29;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: 280px;
    padding: 24px 14px 70px;
    background-color: #fff;
`;

export const Close = styled.button`
    z-index: 31;
    position: absolute;
    top: 24px;
    right: 14px;
    width: 24px;
    height: 24px;
    background: url(${closeIcon}) center no-repeat;

    & + * {
        z-index: 30;
    }
`;