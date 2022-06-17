import React, { useState, useEffect } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { activateFindPwd, deactivateFindId, activateSignup } from '../../store/actions/mode';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import { module } from '../../themes/module';
import { FIND_ID } from '../../sheme/modal';
import FindIdSuccess from '../../components/Account/FindIdSuccess/FindIdSuccess';
import Section from '../../components/ui/Section/Section';
import { getFindIdAuth } from '../../api/auth';


const FindIdContainer = () => {

    const dispatch = useDispatch();

    const [ modalProps, setModalProps ] = useState(modalBaseProps);
    const [ authSuccess, setAuthSuccess ] = useState(null);
    const [ userId, setUserId ] = useState("");

    const initModalProps = (prop) => {
        setModalProps(Object.assign({}, modalBaseProps, prop));
    };

    const onResultSubmit = result => {
        console.log(result);
        if(result && result.data.code === 1) {
            setUserId(result.data.message);
            setAuthSuccess(true);
            initModalProps(FIND_ID.SUCCESS);
        } else {
            setAuthSuccess(false);
            initModalProps(FIND_ID.FAIL);
        }
    };

    useEffect(() => {
        initModalProps(FIND_ID.FORM);
    }, []);

    const modalBaseProps = {
        open: true,
        width: "360",
        close: true,
        onCloseClick: () => { dispatch(deactivateFindId()) }
    };

    const sectionProps = {
        title: "아이디 찾기",
        themeColor: "primary",
        close: false,
        back: true,
        onBackClick: () => {dispatch(deactivateFindId())},
        action: false
    };

    const RENDER_TEMPLATE = () => (
        <>
            {
                authSuccess === null && 
                <AuthenticationContainer
                    authApi={ getFindIdAuth }
                    onResultSubmit={ onResultSubmit }
                    description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
                />
            }
            {
                authSuccess === true &&
                <FindIdSuccess data={ userId } />
            }
            {
                authSuccess === false &&
                <module.SubmitButton
                    onClick={ () => dispatch(activateSignup()) }
                >회원가입</module.SubmitButton>
            }
        </>
    );
    
    return (
        <>
        {
            isBrowser &&
                <Modal {...modalProps}>
                    { RENDER_TEMPLATE() }
                    <module.ModalAction>
                        <button className="link" onClick={() => dispatch(activateFindPwd())}>비밀번호 찾기</button>
                    </module.ModalAction>
                </Modal>
        }
        {
            isMobile &&
            <Section {...sectionProps}>
                { RENDER_TEMPLATE() }
                <module.SectionLink className="btm">
                    <button className="link" onClick={() => dispatch(activateFindPwd())}>비밀번호 찾기</button>
                </module.SectionLink>
            </Section>
        }
        </>
    )
};

export default FindIdContainer;