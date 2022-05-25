import styled from 'styled-components';
import leftIcon from '../../assets/images/icon/ico-side_left.svg'

export const Pannel = styled.div`
    z-index: 20;
    position: fixed;    
    left: ${ props => 
        props.type === "main"? ( props.active? `14px` : `-390px`) : ( props.active? `14px` : `-400px`)
    };
    top: ${ props => props.type === "main"? `104px` : `80px` };
    width: 390px;
    height: ${ props => props.type === "main"? `calc(100% - 140px)` : `calc(100% - 80px)` };
    overflow: show;
    transition: left .3s;
`;

export const PannelWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const PannelBtn = styled.button`
    position: absolute;
    top: 50%;
    right: -24px;
    width: 24px;
    height: 52px;
    border-radius: 0 4px 4px 0;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    background: url(${ leftIcon }) center no-repeat #fff;
`;
 