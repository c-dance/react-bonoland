import React, { useState, useEffect } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { activateFindPwd, deactivateFindId } from '../../store/actions/mode';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import { module } from '../../themes/module';
import { FIND_ID } from '../../sheme/modal';
import FindIdSuccess from '../../components/Account/FindIdSuccess/FindIdSuccess';
import Section from '../../components/ui/Section/Section';

const FindIdContainer = () => {

    const dispatch = useDispatch();

    const authentificated = useSelector(state => state.Auth.authentificated);
    const [ modalProps, setModalProps ] = useState(modalBaseProps);
    const [ authResult, setAuthResult ] = useState(false);

    const initModalProps = (prop) => {
        setModalProps(Object.assign({}, modalBaseProps, prop));
    };

    const onResultSubmit = result => {
        setAuthResult(result);
        if(!result) initModalProps(FIND_ID.FAIL);
        else initModalProps(FIND_ID.SUCCESS);
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
    
    return (
        <>
        {
            isBrowser &&
                <Modal {...modalProps}>
                    {
                        !authResult && 
                        <AuthenticationContainer
                            onResultSubmit={ onResultSubmit }
                            description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
                        />
                    }
                    {
                        authResult &&
                        <FindIdSuccess data={"idenit@naver.com"} />
                    }
                    <module.ModalAction>
                        <button className="link" onClick={() => dispatch(activateFindPwd())}>비밀번호 찾기</button>
                    </module.ModalAction>
                </Modal>
        }
        {
            isMobile &&
            <Section {...sectionProps}>
                {
                    !authResult && 
                    <AuthenticationContainer
                        onResultSubmit={ onResultSubmit }
                        description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
                    />
                }
                {
                    authResult &&
                    <FindIdSuccess data={"idenit@naver.com"} />
                }
                <module.SectionLink className="btm">
                    <button className="link" onClick={() => dispatch(activateFindPwd())}>비밀번호 찾기</button>
                </module.SectionLink>
            </Section>
        }
        </>
    )
};

export default FindIdContainer;