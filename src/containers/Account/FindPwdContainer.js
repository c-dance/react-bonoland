import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import NewPassword from '../../components/Account/NewPassword/NewPassword';
import { module } from '../../themes/module';
import { FIND_PWD } from '../../sheme/modal';
import { activateLogin, activateFindId, deactivateFindPwd } from '../../store/actions/mode';

const FindPwdContainer = () => {

    const dispatch = useDispatch();

    let auth = useSelector(state => state.Auth.authentificated);
    let phone = useSelector(state => state.Auth);

    const [ newPwd01, setNewPwd01 ] = useState('');
    const [ newPwd02, setNewPwd02 ] = useState('');
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ authResult, setAuthResult ] = useState(false);
    const [ noAccount, setNoAccount ] = useState(null);
    const [ newPwdSuccess, setNewPwdSuccess ] = useState(false);

    const onFormSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };

    const onResultSubmit = result => {
        setAuthResult(result);
    };

    /* === props === */
    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: () => dispatch(deactivateFindPwd()),
        width: "360",
        title: "비밀번호 찾기",
        description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
    };

    const writeModalProps = Object.assign({}, modalProps, FIND_PWD.FORM);
    const successModalProps = Object.assign({}, modalProps, FIND_PWD.SUCCESS);
    const failedModalProps = Object.assign({}, modalProps, FIND_PWD.FAIL);

    return (
        <>
            <BrowserView>
            {
                !authResult && 
                <Modal {...modalProps}>
                    <AuthenticationContainer 
                        onResultSubmit={ onResultSubmit }
                    />
                    <span className="" onClick={ () => dispatch(activateFindId()) }>아이디 찾기</span>
                </Modal>
            }
            {
                !authResult && noAccount &&
                <Modal {...failedModalProps}>
                    <>경고</>
                    <span className="" onClick={ () => dispatch(activateFindId()) }>아이디 찾기</span>
                </Modal>
            }
            {
                authResult && !newPwdSuccess &&
                <Modal {...writeModalProps}>
                    <NewPassword 
                        newPwd01={ newPwd01 }
                        newPwd02={ newPwd02 }
                        onFormSubmit={ onFormSubmit } 
                    />
                    <span className="" onClick={ () => dispatch(activateFindId()) }>아이디 찾기</span>
                </Modal>
            }
            {
                authResult && newPwdSuccess &&
                <Modal {...successModalProps}>
                    <span className="" onClick={ () => dispatch(activateLogin()) }>로그인</span> 
                    <span className="" onClick={ () => dispatch(activateFindId()) }>아이디 찾기</span>
                </Modal>
            }
            </BrowserView>
        </>
    )
};

export default FindPwdContainer;