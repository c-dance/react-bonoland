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
import { getFindIdAuth } from '../../api/auth';


const FindIdContainer = () => {

    const dispatch = useDispatch();

    const [ modalProps, setModalProps ] = useState(modalBaseProps);
    const [ authSuccess, setAuthSuccess ] = useState(false);
    const [ userId, setUserId ] = useState("");

    const initModalProps = (prop) => {
        setModalProps(Object.assign({}, modalBaseProps, prop));
    };

    const onResultSubmit = result => {
        // test
        const RESULT = {
            bonoUser: true,
            message: 'bono12@naver.com'
        }
        const IS_USER = RESULT.bonoUser;
        if(!IS_USER) {
            setAuthSuccess(false);
            initModalProps(FIND_ID.FAIL);
        } else {
            setAuthSuccess(true);
            setUserId(RESULT.message);
            initModalProps(FIND_ID.SUCCESS);
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
                !authSuccess && 
                <AuthenticationContainer
                    authApi={ getFindIdAuth }
                    onResultSubmit={ onResultSubmit }
                    description="회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
                />
            }
            {
                authSuccess &&
                <FindIdSuccess data={ userId } />
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