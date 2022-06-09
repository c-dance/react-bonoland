import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import NewPassword from '../../components/Account/NewPassword/NewPassword';
import { module } from '../../themes/module';
import { FIND_PWD } from '../../sheme/modal';
import { activateLogin, activateFindId, deactivateFindPwd } from '../../store/actions/mode';
import Section from '../../components/ui/Section/Section';
import FindPwdSuccess from '../../components/Account/FindPwdSuccess/FindPwdSuccess';

const FindPwdContainer = () => {

    const dispatch = useDispatch();

    let auth = useSelector(state => state.Auth.authentificated);
    let phone = useSelector(state => state.Auth);

    const [ authResult, setAuthResult ] = useState(false);
    const [ noAccount, setNoAccount ] = useState(null);
    const [ newPwdSuccess, setNewPwdSuccess ] = useState(false);

    const onFormSubmit = data => {
        console.log(data);
        setNewPwdSuccess(true);
    };

    const onResultSubmit = result => {
        setAuthResult(result);
    };

    /* === props === */
    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: () => { dispatch(deactivateFindPwd()) },
        width: "360",
        title: "비밀번호 찾기",
        description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
    };

    const writeModalProps = Object.assign({}, modalProps, FIND_PWD.FORM);
    const successModalProps = Object.assign({}, modalProps, FIND_PWD.SUCCESS);
    const failedModalProps = Object.assign({}, modalProps, FIND_PWD.FAIL);
    
    const sectionProps = {
        title: "비밀번호 찾기",
        themeColor: "primary",
        close: false,
        back: true,
        onBackClick: () => {dispatch(deactivateFindPwd())},
        action: false
    };

    return (
        <>
            {
                isBrowser &&
                <>
                    {
                        !authResult && 
                        <Modal {...modalProps}>
                            <AuthenticationContainer 
                                onResultSubmit={ onResultSubmit }
                                description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 아이디를 확인하실 수 있습니다."
                            />
                            <module.ModalAction>
                                <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                            </module.ModalAction>
                        </Modal>
                    }
                    {
                        !authResult && noAccount &&
                        <Modal {...failedModalProps}>
                            <>경고</>
                            <module.ModalAction>
                                <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                            </module.ModalAction>
                        </Modal>
                    }
                    {
                        authResult && !newPwdSuccess &&
                        <Modal {...writeModalProps}>
                            <NewPassword 
                                onFormSubmit={ onFormSubmit } 
                            />
                            <module.ModalAction>
                                <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                            </module.ModalAction>
                        </Modal>
                    }
                    {
                        authResult && newPwdSuccess &&
                        <Modal {...successModalProps}>
                            <module.ModalAction>
                                <button className="btn" onClick={() => dispatch(activateLogin())}>로그인</button>
                                <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                            </module.ModalAction>
                        </Modal>
                    }
                </>
            }
            {
                isMobile &&
                <Section {...sectionProps}>
                    {
                        !authResult && 
                        <>
                            <AuthenticationContainer 
                                onResultSubmit={ onResultSubmit }
                                description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 아이디를 확인하실 수 있습니다."
                            />
                        </>
                    }
                    {
                        !authResult && noAccount &&
                        <>
                            <>경고</>
                        </>
                    }
                    {
                        authResult && !newPwdSuccess &&
                        <NewPassword 
                            onFormSubmit={ onFormSubmit } 
                        />
                    }
                    {
                        authResult && newPwdSuccess &&
                        <FindPwdSuccess />
                    }
                    <module.SectionLink className="btm">
                        <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                    </module.SectionLink>
                </Section>
            }
        </>
    )
};

export default FindPwdContainer;