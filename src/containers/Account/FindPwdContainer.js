import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import AuthenticationContaienr from '../Authentifiction/AuthentificationContainer';
import NewPassword from '../../components/Account/NewPassword/NewPassword';
import { module } from '../../themes/module';

const FindPwdContainer = ({ active, toggleActive }) => {

    const [ auth, setAuth ] = useState(null);

    const [ newPwd01, setNewPwd01 ] = useState('');
    const [ newPwd02, setNewPwd02 ] = useState('');
    const [ formSubmitted, setFormSubmitted ] = useState(false);


    const handleAuth = (result) => {
        setAuth(result);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };

    const deactivateFindPwd = () => {
        toggleActive();
        setNewPwd01('');
        setNewPwd02('');
        setFormSubmitted(false);
    };

    /* === props === */

    const modalProps = {
        open: active ,
        close: true,
        onCloseClick: deactivateFindPwd,
        width: "360",
        title: "비밀번호 찾기",
        description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
    };

    const writeModalProps = Object.assign({}, modalProps, {
        title: "비밀번호 재설정",
        description: "새로 변경하실 비밀번호를 입력해주세요."
    });

    const successModalProps = Object.assign({}, modalProps, { 
        title: "비밀번호 변경 완료",
        description: "새로운 비밀번호로 변경이 완료되었습니다.",
    });

    const failedModalProps = Object.assign({}, modalProps, { 
        title: "계정 찾기 실패", 
        description: "해당 번호로 가입된 계정이 없습니다." 
    });

    const authProps = {
        handleAuth: handleAuth,
        description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
    };

    return (
        <>
            <BrowserView>
            {
                auth === null &&
                <Modal {...modalProps}>
                    <AuthenticationContaienr {...authProps}/>
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                auth === false &&
                <Modal {...failedModalProps}>
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                auth && !formSubmitted &&
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
            <MobileView>
            {
                auth === null &&
                <Modal {...modalProps}>
                    <AuthenticationContaienr {...authProps}/>
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                auth === false &&
                <Modal {...failedModalProps}>
                    <span className="" onClick="">아이디 찾기</span>
                </Modal>
            }
            {
                auth && !formSubmitted &&
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
            </MobileView>
        </>
    )
};

export default FindPwdContainer;