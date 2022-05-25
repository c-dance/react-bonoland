import styled from 'styled-components';
import leftIcon from '../../assets/images/icon/ico-side_left.svg'

export const Aside = styled.div`
    z-index: 20;
    position: fixed;    
    left: 0;
    top: 80px;
    width: 390px;
    height: calc(100% - 390px);
    overflow: show;
`;

export const AsideBtn = styled.button`
    position: absolute;
    top: 50%;
    right: -24px;
    width: 24px;
    height: 52px;
    border-radius: 0 4px 4px 0;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    background: url(${ leftIcon }) center no-repeat #fff;
`;
 