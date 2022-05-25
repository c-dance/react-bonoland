import { useState } from 'react';
import ReactModal from "react-modal";
import { ModalWrap, Close, Title, Hr, Contents } from './ModalStyle';
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

    const SIZE_LARGE = Number(width) > 390;

    return (
        <ReactModal
            isOpen={ open }
            style={ customStyle }
        >
            <ModalWrap>
                { title && <Title className={ SIZE_LARGE && "a-c" }> { title }</Title> }
                { SIZE_LARGE && <Hr /> }
                { close && <Close onClick={ () => { onCloseClick? onCloseClick() :  navigate(-1) } } /> }
                <Contents>
                    { children }
                </Contents>
            </ModalWrap>
        </ReactModal>
    )
};

export default Modal