import styled from 'styled-components';
import leftIcon from '../../../assets/images/icon/ico-side_left.svg'
import rightIcon from '../../../assets/images/icon/ico-side_left.svg'

export const PanelBox = styled.div`
    z-index: 30;
    position: fixed;    
    left: ${ props => 
        props.position === 'right'? 'auto'
        : props.type === "floating"? ( props.active? `14px` : `-390px`) : ( props.active? `0` : `-390px`)
    };
    right: ${ props =>
        props.position === 'right'? '0px' : 'auto'
    };
    top: ${ props => props.type === "floating"? `104px` : `80px` };
    width: 390px;
    height: ${ props => props.type === "floating"? `900px` : `calc(100% - 80px)` };
    overflow: show;
    background-color: ${ props => props.type === 'floating'? 'transparent' : '#fff' };
    transition: left .3s;
    box-shadow: ${ props => props.type === "side"  && '3px 3px 6px rgba(0,0,0,.06)'};
`;

export const PanelWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const PanelBtn = styled.button`
    position: absolute;
    top: 50%;
    right: -24px;
    width: 24px;
    height: 52px;
    border-radius: 0 4px 4px 0;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    background: url(${ 
        props => props.active? rightIcon : leftIcon
    }) center no-repeat #fff;
`;
 