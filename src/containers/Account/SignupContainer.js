import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import SignupType from "../../components/Account/SignupType/SignupType";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import SignupForm from "../../components/Account/SignupForm/SignupForm";
import SignupSuccess from '../../components/Account/SignupSuccess/SignupSuccess';
import Modal from "../../components/Modal/Modal";
import { deactivateSignup } from '../../store/actions/service';
import Section from '../../components/ui/Section/Section';
import { userSignup } from '../../api/user';
import { activateAlert } from '../../store/actions/alert';
import { getSignUpAuth } from '../../api/auth';
import { activateAuth, deactivateAuth } from '../../store/actions/auth';

const SignupContaienr = () => {

    const dispatch = useDispatch();

    /* === 인증 === */
    const AUTH = useSelector(state => state.Auth);
    const AUTH_MODE = AUTH.active;
    const AUTH_SUCCESS = AUTH.success;
    const AUTH_PHONENUMBER = AUTH.phoneNumber;

    /* === 사용자 타입 === */
    const [ type, setType ] = useState('');
    const [ typeSumitted, setTypeSubmitted ] = useState(false);

    /* === 휴대폰 인증 결과 === */
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ authSuccess, setAuthSuccess ] = useState(false);

    // 회원가입 성공
    const [ invalidId, setInvalidId] = useState('');
    const [ signupSuccess, setSignupSuccess ] = useState(false);
    
    // type 폼 제출
    const onTypeSubmit = userType => {
        if(userType.length < 0) {
            alert("매도/매수중 하나를 선택해주세요.");
        } else {
            setType(userType);
            setTypeSubmitted(true);
            dispatch(activateAuth({
                description: "본인인증을 위해 휴대폰 번호를 입력해주세요!"
            }));
        }
    };

    const quitSignup = () => {
        dispatch(deactivateSignup());
        dispatch(deactivateAuth());
    };

    // 회원가입 폼 제출
    const onFormSubmit = async data => {
        const RESPONSE = await userSignup({
            ...data, 
            userTel: phoneNumber, 
            userCtg: type
        });

        if(RESPONSE && RESPONSE.data.code === 1) {
            setSignupSuccess(true);
        } else if(RESPONSE && RESPONSE.data.code === 0) {
            setInvalidId(data.userId);
            setSignupSuccess(false);
        } else {
            dispatch(deactivateSignup());
            dispatch(activateAlert({
                title: "회원가입 실패",
                contents: RESPONSE.data.message || "회원가입에 실패했습니다. 다시 시도해 주세요."
            }))
        }
    };

    const getSignUpForm = async phoneNumber => {
        setPhoneNumber(phoneNumber);
        
        const RESPONSE = await getSignUpAuth(phoneNumber);
                
        dispatch(deactivateAuth());

        if(RESPONSE && RESPONSE.data.code === 1) {
            setAuthSuccess(true);
        } else {
            dispatch(deactivateSignup());
            dispatch(activateAlert({
                title: "회원가입 실패",
                contents: RESPONSE.data.message || "해당 휴대폰 번호로 이미 가입된 회원입니다. \n 로그인 서비스를 이용해 주세요."
            }));
        }
    };

    useEffect(() => {
        if(AUTH_SUCCESS) {
            getSignUpForm(AUTH_PHONENUMBER);
        }
    }, [AUTH_SUCCESS])

    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: () => { quitSignup() },
        width: "360",
        title: "회원가입"
    };

    const sectionProps = {
        title: "회원가입",
        themeColor: "primary",
        close: false,
        back: true,
        onBackClick: () => { quitSignup() },
        action: false
    };

    const alertProps = Object.assign({}, modalProps, { title: "회원가입 완료!" });

    const typeProps = {
        type: type,
        onTypeSubmit: onTypeSubmit
    };

    return (
        <>
            {
                isBrowser &&
                <>
                    {
                        !typeSumitted &&
                        <Modal {...modalProps}>
                            <SignupType {...typeProps}/>
                        </Modal>
                    }
                    {
                        AUTH_MODE &&
                        <Modal {...modalProps}>
                            <AuthenticationContainer />
                        </Modal>
                    }
                    {
                        authSuccess && signupSuccess === false &&
                        <Modal {...modalProps}>
                            <SignupForm
                                onFormSubmit={ onFormSubmit }
                                invalidId={ invalidId }
                            />
                        </Modal>
                    }
                    {
                        signupSuccess &&
                        <Modal {...alertProps}>
                            <SignupSuccess />
                        </Modal>
                    }
                </>
            }
            {
                isMobile && 
                <Section {...sectionProps}>
                    {
                        !typeSumitted &&
                        <SignupType {...typeProps}/>
                    }
                    {
                        typeSumitted && !authSuccess &&
                        <AuthenticationContainer />
                    }
                    {
                        authSuccess && !signupSuccess &&
                        <SignupForm
                            onFormSubmit={ onFormSubmit }
                            invalidId={ invalidId }
                        />
                    }
                    {
                        signupSuccess &&
                        <SignupSuccess />
                    } 
                </Section>
            }

        </>
    )
};

export default SignupContaienr;