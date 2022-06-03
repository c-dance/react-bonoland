import styled from 'styled-components';
import closeIcon from '../../assets/images/icon/ico-x.svg';

export const ModalWrap = styled.div`
    position: relative;
    width: 100%;
    padding: 32px;
`;

export const Close = styled.div`
    position: absolute;
    top: 36px;
    right: 36px;
    width: 18px;
    height: 18px;
    background: url(${closeIcon}) center no-repeat;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: ${({theme}) => theme.fontWeights.medium };

    &.a-c {
        text-align: center;
    }
`;

export const Description = styled.p`
    margin: 16px 0 40px;
    line-height: 1.4;
    font-size: ${({theme}) => theme.fontSizes.xs };
    color: ${({theme}) => theme.colors.gray500 };
`;

export const Hr = styled.hr`
    display: block;
    width: 100%;
    height: 2px;
    margin: 24px 0;
    border: 0;
    background-color: ${({ theme }) => theme.colors.primary };
`;

export const Contents = styled.div`
    width: 100%;
    margin-top: 16px;
    font-size: ${({theme}) => theme.fontSizes.s };
    color: ${({theme}) => theme.colors.gray500 };
    line-height: 1.4;
`;

export const CloseAction = styled.div`
    width: 100%;
    height: 44px;
    margin-top: 32px;
    border-radius: 2px;
    line-height: 44px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.primary };
    color: #fff;
`;