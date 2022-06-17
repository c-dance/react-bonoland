import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import NewPassword from '../../components/Account/NewPassword/NewPassword';
import { module } from '../../themes/module';
import { FIND_PWD } from '../../sheme/modal';
import { activateLogin, activateFindId, deactivateFindPwd, activateSignup } from '../../store/actions/mode';
import Section from '../../components/ui/Section/Section';
import FindPwdSuccess from '../../components/Account/FindPwdSuccess/FindPwdSuccess';
import { getFindPwdAuth, getNewPwdAuth } from '../../api/auth';
import { activateAlert } from '../../store/actions/alert';

const FindPwdContainer = () => {

    const dispatch = useDispatch();

    const [ authSuccess, setAuthSuccess ] = useState(null);
    const [ noAccount, setNoAccount ] = useState(null);
    const [ newPwdSuccess, setNewPwdSuccess ] = useState(null);

    const onFormSubmit = async data => {
        console.log(data);
        // setNewPwdSuccess(true);
        const RESPONSE = await getNewPwdAuth(data.newPwd01);
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 1) {
            setNewPwdSuccess(true);
        } else {
            setNewPwdSuccess(false);
            alert(RESPONSE.data.message);
        }
    };

    const onResultSubmit = result => {
        console.log(result);
        if(result && result.data.code === 1) {
            setAuthSuccess(true);
        } else {
            setAuthSuccess(false);
            dispatch(activateAlert({
                title: "비밀번호 찾기",
                contents: result.data.message || "비밀번호 찾기에 실패했습니다. 다시 시도해 주세요."
            }))
        }
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
                        authSuccess === null && 
                        <Modal {...modalProps}>
                            <AuthenticationContainer 
                                authApi={ getFindPwdAuth }
                                onResultSubmit={ onResultSubmit }
                                description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 아이디를 확인하실 수 있습니다."
                            />
                            <module.ModalAction>
                                <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                            </module.ModalAction>
                        </Modal>
                    }
                    {
                        authSuccess === false && 
                        <Modal {...failedModalProps}>
                            <module.SubmitButton
                                onClick={ () => dispatch(activateSignup()) }
                            >회원가입</module.SubmitButton>
                            <module.ModalAction>
                                <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                            </module.ModalAction>
                        </Modal>
                    }
                    {
                        authSuccess === true && !newPwdSuccess &&
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
                        authSuccess && newPwdSuccess &&
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
                        !authSuccess && 
                        <>
                            <AuthenticationContainer 
                                onResultSubmit={ onResultSubmit }
                                description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 아이디를 확인하실 수 있습니다."
                            />
                        </>
                    }
                    {
                        !authSuccess && noAccount &&
                        <>
                            <>경고</>
                        </>
                    }
                    {
                        authSuccess && !newPwdSuccess &&
                        <NewPassword 
                            onFormSubmit={ onFormSubmit } 
                        />
                    }
                    {
                        authSuccess && newPwdSuccess &&
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