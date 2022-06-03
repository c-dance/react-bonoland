import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import NewPassword from '../../components/Account/NewPassword/NewPassword';
import { module } from '../../themes/module';
import { FIND_PWD } from '../../sheme/modal';

const FindPwdContainer = () => {

    let auth = useSelector(state => state.Auth.authentificated);
    let phone = useSelector(state => state.Auth);

    const [ newPwd01, setNewPwd01 ] = useState('');
    const [ newPwd02, setNewPwd02 ] = useState('');
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const onFormSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };

    const deactivateFindPwd = () => {
        setNewPwd01('');
        setNewPwd02('');
        setFormSubmitted(false);
    };

    /* === props === */
    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: deactivateFindPwd,
        width: "360",
        title: "비밀번호 찾기",
        description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
    };
    const writeModalProps = Object.assign({}, modalProps, FIND_PWD.FORM);
    const successModalProps = Object.assign({}, modalProps, FIND_PWD.SUCCESS);
    const failedModalProps = Object.assign({}, modalProps, FIND_PWD.FAIL);

    useEffect(() => {
        console.log(auth);
        console.log(phone);
    }, [ auth ])

    return (
        <>
            <BrowserView>
            {
                auth === null &&
                <Modal {...modalProps}>
                    <AuthenticationContainer />
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                auth === false &&
                <Modal {...failedModalProps}>
                    <>경고</>
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                auth === true && !formSubmitted &&
                <Modal {...writeModalProps}>
                    <NewPassword onFormSubmit={ onFormSubmit } />
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                formSubmitted &&
                <Modal {...successModalProps}>
                    <span className="" onClick="">로그인</span> 
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            </BrowserView>
        </>
    )
};

export default FindPwdContainer;