import { useState } from 'react';
import ReactModal from "react-modal";
import { ModalWrap, Close, Title, Hr } from './ModalStyle';
import { useNavigate } from 'react-router';

const modalStyle = {
    overlay: {
        zIndex: '90',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    content: {
        zIndex: '91',
        top: '50%', 
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '100%',
        maxWidth: '390px',
        height: 'auto',
        maxHeight: '100%',
        padding: '0',
        transform: 'translate(-50%, -50%)'
    }
};

const Modal  = ({ 
    open, 
    close, 
    onCloseClick, 
    title, 
    width,
    height,
    children 
}) => {

    const navigate = useNavigate();

    const customStyle = Object.assign({}, modalStyle);
    if(width) customStyle.content.maxWidth = width + 'px';
    if(height) customStyle.content.maxHeight = height + 'px';

    return (
        <ReactModal
            isOpen={ open }
            style={ customStyle }
        >
            <ModalWrap>
                { title && <Title> { title }</Title> }
                { title && <Hr /> }
                { close && <Close
                    onClick={ () => { onCloseClick? onCloseClick() :  navigate(-1) } }
                /> }
                { children }
            </ModalWrap>
        </ReactModal>
    )
};

export default Modal