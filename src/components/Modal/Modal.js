import React from 'react';
import ReactModal from "react-modal";
import { ModalWrap, Close, Title, Description, Hr, Contents, CloseAction } from './ModalStyle';
import { useNavigate } from 'react-router';
import { isBrowser } from 'react-device-detect';

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
        maxWidth: `${ isBrowser? "390px" : "calc(100% - 28px)" }`,
        height: 'auto',
        maxHeight: 'calc(100% - 160px)',
        padding: '0',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden', 
        borderRadius: '10px'
    }
};

const Modal  = ({ 
    open, 
    close, 
    onCloseClick, 
    closeAction, 
    title, 
    description,
    width,
    height,
    center = false,
    children 
}) => {

    const navigate = useNavigate();

    const customStyle = Object.assign({}, modalStyle);
    if(width && isBrowser) customStyle.content.maxWidth = width + 'px';
    if(height) customStyle.content.maxHeight = height + 'px';

    const SIZE_LARGE = Number(width) > 390;

    return (
        <ReactModal
            isOpen={ open? open : true }
            style={ customStyle }
            appElement={document.getElementById('root') || undefined}
            onRequestClose={ () => { onCloseClick && onCloseClick() } }
        >
            <ModalWrap>
                { 
                    title && 
                    <Title className={ (SIZE_LARGE || center === true) && "a-c" }> { title }</Title> 
                }
                { 
                    description && 
                    <Description>{ description }</Description> 
                }
                { 
                    SIZE_LARGE && 
                    <Hr /> 
                }
                { 
                    close && 
                    <Close onClick={ () => { onCloseClick? onCloseClick() :  navigate(-1) } } /> 
                }
                <Contents>
                    { children }
                </Contents>
                { 
                    closeAction && 
                    <CloseAction onClick={ () => { onCloseClick && onCloseClick() } }>확인</CloseAction> 
                }
            </ModalWrap>
        </ReactModal> 
    )
};

export default Modal