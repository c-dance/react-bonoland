import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import NewPassword from '../../components/Account/NewPassword/NewPassword';
import { module } from '../../themes/module';
import { FIND_PWD } from '../../scheme/modal';
import { activateLogin, activateFindId, deactivateFindPwd, activateSignup } from '../../store/actions/mode';
import Section from '../../components/ui/Section/Section';
import FindPwdSuccess from '../../components/Account/FindPwdSuccess/FindPwdSuccess';
import { getFindPwdAuth } from '../../api/auth';
import { modifyUserPwd } from '../../api/user';
import { activateAlert } from '../../store/actions/alert';
import { activateAuth, deactivateAuth } from '../../store/actions/auth';
import FindIdFailed from '../../components/Account/FindIdFailed/FindIdFailed';

const FindPwdContainer = () => {

    const dispatch = useDispatch();

    const AUTH = useSelector(state => state.Auth);
    const AUTH_MODE = AUTH.active;
    const AUTH_PHONENUMBER = AUTH.phoneNumber;
    const AUTH_SUCCESS = AUTH.success;

    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ authSuccess, setAuthSuccess ] = useState(null);
    const [ newPwdSuccess, setNewPwdSuccess ] = useState(null);

    const [ modalProps, setModalProps ] = useState({});

    const setNewPwd = async data => {
        const RESPONSE = await modifyUserPwd({
            userTel: phoneNumber,
            userPwd: data["newPwd01"]
        });

        // quitFindPwd();

        if(RESPONSE && RESPONSE.data.code === 1) {
            setNewPwdSuccess(true);
            if(isBrowser) setModalProps(successModalProps);
            // dispatch(activateAlert({
            //     title: "비밀번호 변경 완료",
            //     contents: "비밀번호 변경이 완료되었습니다."
            // }));
        } else {
            dispatch(activateAlert({
                title: "비밀번호 변경 실패",
                contents: "비밀번호 변경 중 오류가 발생했습니다. \n 다시 시도해 주세요."
            }));
        }
    };

    const getNewPwdForm = async phoneNumber => {
        const RESPONSE = await getFindPwdAuth(phoneNumber);
        
        dispatch(deactivateAuth());

        if(RESPONSE && RESPONSE.data.code === 1) {
            setAuthSuccess(true);
            if(isBrowser) setModalProps(writeModalProps);
        } else {
            setAuthSuccess(false);
            if(isBrowser) setModalProps(failedModalProps);
            // dispatch(deactivateFindPwd());
            // dispatch(activateAlert({
            //     title: "비밀번호 찾기",
            //     contents: RESPONSE.data.message || "계정 찾기에 실패했습니다. \n 다시 시도해 주세요."
            // }));
        }
    };

    const quitFindPwd = () => {
        dispatch(deactivateFindPwd());
        dispatch(deactivateAuth());
    };

    useEffect(() => {
        if(AUTH_SUCCESS) {
            setPhoneNumber(AUTH_PHONENUMBER);
            getNewPwdForm(AUTH_PHONENUMBER);
        }
    }, [AUTH_SUCCESS])

    useEffect(() => {
        setModalProps(baseModalProps);
        dispatch(activateAuth({
            description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 재설정 할 수 있습니다."
        }));
    }, []);

    /* === props === */
    const baseModalProps = {
        open: true ,
        close: true,
        onCloseClick: () => { quitFindPwd() },
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
        onBackClick: () => { quitFindPwd() },
        action: false
    };


    return (
        <>
            {
                isBrowser &&
                <Modal {...modalProps}>
                    {
                        authSuccess === null && 
                        <AuthenticationContainer />

                    }
                    {
                        authSuccess === false &&
                        <module.SubmitButton
                            onClick={ () => dispatch(activateSignup()) }
                        >회원가입</module.SubmitButton>
                    }
                    {
                        authSuccess === true && !newPwdSuccess &&
                        <NewPassword 
                            onFormSubmit={ setNewPwd } 
                        />
                    }
                    <module.ModalAction>
                        { newPwdSuccess && <button className="btn" onClick={() => dispatch(activateLogin())}>로그인</button> }
                        <button className="link" onClick={() => dispatch(activateFindId())}>아이디 찾기</button>
                    </module.ModalAction>
                </Modal>
            }
            {
                isMobile &&
                <Section {...sectionProps}>
                    {
                        authSuccess === null && 
                        <AuthenticationContainer />
                    }
                    {
                        authSuccess === false &&
                        <FindIdFailed />
                    }
                    {
                        authSuccess === true && !newPwdSuccess &&
                        <NewPassword 
                            setNewPwd={ setNewPwd } 
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