import styled from 'styled-components';
import pinIcon from '../../assets/images/map/ico-pin.svg';

export const Region = styled.div`
    display: ${props => props.display };
    z-index: 11;
    position: fixed;
    top: 104px;
    left: 50%;
    transform: translateX(-50%);
    height: 46px;
    line-height: 46px;
    padding: 0 24px 0 44px;
    border-radius: 23px;
    background: url(${pinIcon}) 20px center/ 14px 14px no-repeat #fff;
    font-size: ${ ({theme}) => theme.fontSizes.s };
`;