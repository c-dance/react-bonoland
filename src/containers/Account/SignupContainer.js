import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_USER } from '../../store/actions/auth';
import { BrowserView, MobileView } from 'react-device-detect';
import SignupType from "../../components/Account/SignupType/SignupType";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import SignupForm from "../../components/Account/SignupForm/SignupForm";
import SignupSuccess from '../../components/Account/SignupSuccess/SignupSuccess';
import Modal from "../../components/Modal/Modal";
import { deactivateSignup } from '../../store/actions/mode';

const SignupContaienr = () => {

    const dispatch = useDispatch();
    const authentificated = useSelector(state => state.Auth.authentificated);

    // type 입력
    const [ type, setType ] = useState('');
    const [ typeSumitted, setTypeSubmitted ] = useState(false);

    // 인증 
    const [ authResult, setAuthResult ] = useState(false);

    // 회원가입 입력폼
    const [ form , setForm ] = useState({});
    const [ newAccountSuccess, setNewAccountSuccess ] = useState(false);

    // type 값 입력
    const onTypeChange = (event) => {
        setType(event.currentTarget.value);
    };
    
    // type 폼 제출
    const onTypeSubmit = (event) => {
        event.preventDefault();
        if(type.length > 0) setTypeSubmitted(true);
        else alert('매도/매수중 하나를 선택해주세요.');
    };


    // 회원가입 폼 제출
    const onFormSubmit = (event) => {
        event.preventDefault();
        // 입력폼 유효성 검사
        setNewAccountSuccess(true);
    };

    const onResultSubmit = result => {
        setAuthResult(result)
    };

    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: () => dispatch(deactivateSignup()),
        width: "360",
        title: "회원가입"
    };

    const alertProps = Object.assign(modalProps, { title: "회원가입 완료!" });

    const typeProps = {
        type: type,
        onTypeChange: onTypeChange,
        onTypeSubmit: onTypeSubmit
    };

    return (
        <>
            <BrowserView>
                {
                    !typeSumitted &&
                    <Modal {...modalProps}>
                        <SignupType {...typeProps}/>
                    </Modal>
                }
                {
                    typeSumitted && !authResult &&
                    <Modal {...modalProps}>
                        <AuthenticationContainer
                            onResultSubmit={ onResultSubmit }
                        />
                    </Modal>
                }
                {
                    authResult && !newAccountSuccess &&
                    <Modal {...modalProps}>
                        <SignupForm
                            onFormSubmit={ onFormSubmit }
                        />
                    </Modal>
                }
                {
                    newAccountSuccess &&
                    <Modal {...alertProps}>
                        <SignupSuccess />
                    </Modal>
                }
            </BrowserView>

        </>
    )
};

export default SignupContaienr;