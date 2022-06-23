import React, { useState, useEffect } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { activateFindPwd, deactivateFindId, activateSignup } from '../../store/actions/mode';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import { module } from '../../themes/module';
import { FIND_ID } from '../../sheme/modal';
import FindIdSuccess from '../../components/Account/FindIdSuccess/FindIdSuccess';
import Section from '../../components/ui/Section/Section';
import { getFindIdAuth } from '../../api/auth';
import { activateAuth, deactivateAuth } from '../../store/actions/auth';
import FindIdFailed from '../../components/Account/FindIdFailed/FindIdFailed';


const FindIdContainer = () => {

    const dispatch = useDispatch();

    const AUTH = useSelector(state => state.Auth);
    const AUTH_MODE = AUTH.active;
    const AUTH_PHONENUMBER = AUTH.phoneNumber;
    const AUTH_SUCCESS = AUTH.success;

    const [ modalProps, setModalProps ] = useState({});
    const [ authSuccess, setAuthSuccess ] = useState(null);
    const [ userId, setUserId ] = useState("");

    const initModalProps = (prop) => {
        setModalProps(Object.assign({}, modalBaseProps, prop));
    };

    const getId = async phoneNumber => {
        const RESPONSE = await getFindIdAuth(phoneNumber);

        dispatch(deactivateAuth());

        if(RESPONSE && RESPONSE.data.code === 1) {
            setUserId(RESPONSE.data.message);
            setAuthSuccess(true);
            initModalProps(FIND_ID.SUCCESS);
        } else {
            setAuthSuccess(false);
            initModalProps(FIND_ID.FAIL);
        }
    };

    const quitFindId = () => {
        dispatch(deactivateAuth());
        dispatch(deactivateFindId());
    };  

    useEffect(() => {
        initModalProps(FIND_ID.FORM);
        dispatch(activateAuth({
            description: "회원가입 시 입력하신 ‘연락처’ 인증을 통해 비밀번호를 확인하실 수 있습니다."
        }));
    }, []);

    useEffect(() => {
        if(AUTH_SUCCESS) getId(AUTH_PHONENUMBER);
    }, [AUTH_SUCCESS]);

    const modalBaseProps = {
        title: "아이디 찾기",
        open: true,
        width: "360",
        close: true,
        onCloseClick: () => {quitFindId()}
    };

    const sectionProps = {
        title: "아이디 찾기",
        themeColor: "primary",
        close: false,
        back: true,
        onBackClick: () => { quitFindId() },
        action: false
    };

    const RENDER_TEMPLATE = () => (
        <>
            {
                AUTH_MODE && 
                <AuthenticationContainer />
            }
            {
                authSuccess === true &&
                <FindIdSuccess data={ userId } />
            }
            {
                authSuccess === false &&
                <>
                    { isMobile && <FindIdFailed />}
                    {
                        isBrowser && 
                        <module.SubmitButton
                            onClick={ () => dispatch(activateSignup()) }
                        >회원가입</module.SubmitButton>
                    }
                </>
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
                        <button 
                            className="link" 
                            onClick={() => dispatch(activateFindPwd())}
                        >비밀번호 찾기</button>
                    </module.ModalAction>
                </Modal>
        }
        {
            isMobile &&
            <Section {...sectionProps}>
                { RENDER_TEMPLATE() }
                <module.SectionLink className="btm">
                    <button 
                        className="link" 
                        onClick={() => dispatch(activateFindPwd())}
                    >비밀번호 찾기</button>
                </module.SectionLink>
            </Section>
        }
        </>
    )
};

export default FindIdContainer;