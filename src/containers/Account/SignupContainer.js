import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import SignupType from "../../components/Account/SignupType/SignupType";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import SignupForm from "../../components/Account/SignupForm/SignupForm";
import SignupSuccess from '../../components/Account/SignupSuccess/SignupSuccess';
import Modal from "../../components/Modal/Modal";
import { deactivateSignup } from '../../store/actions/mode';
import Section from '../../components/ui/Section/Section';
import { userSignup } from '../../api/user';
import { activateAlert } from '../../store/actions/alert';
import { getSignUpAuth } from '../../api/auth';

const SignupContaienr = () => {

    const dispatch = useDispatch();
    const AUTH_SUCCESS = useSelector(state => state.Auth.success);

    useEffect(() => {
        console.log(AUTH_SUCCESS);
    }, [AUTH_SUCCESS])

    /* === 사용자 타입 === */
    const [ type, setType ] = useState('');
    const [ typeSumitted, setTypeSubmitted ] = useState(false);

    /* === 휴대폰 인증 결과 === */
    const [ phoneNumber, setPhoneNumber ] = useState(true);
    const [ authSuccess, setAuthSuccess ] = useState(false);

    // 회원가입 성공
    const [ signupSuccess, setSignupSuccess ] = useState(false);


    // type 값 입력
    const onTypeChange = event => {
        setType(event.currentTarget.value);
    };
    
    // type 폼 제출
    const onTypeSubmit = event => {
        event.preventDefault();
        if(type.length > 0) setTypeSubmitted(true);
        else alert('매도/매수중 하나를 선택해주세요.');
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
        } else {
            dispatch(activateAlert({
                title: "회원가입 실패",
                contents: RESPONSE.data.message || "회원가입에 실패했습니다. 다시 시도해 주세요."
            }))
        }

    };

    const onResultSubmit = result => {
        // test
        const RESULT = {
            auth: true,
            phoneNumber: '01000000000'
        }
        setPhoneNumber(RESULT.phoneNumber);
        setAuthSuccess(RESULT.auth);
        // if(result.bonoUser) {
        //     dispatch(activateAlert({
        //         title: "회원가입 실패",
        //         contents: "해당 휴대폰 번호로 이미 가입된 회원입니다. \n 로그인 서비스를 이용해 주세요."
        //     }))
        // } else {
        //     setPhoneNumber(result.phoneNumber);
        //     setAuthSuccess(result.auth);
        // }
    };

    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: () => dispatch(deactivateSignup()),
        width: "360",
        title: "회원가입"
    };

    const sectionProps = {
        title: "회원가입",
        themeColor: "primary",
        close: false,
        back: true,
        onBackClick: () => dispatch(deactivateSignup()),
        action: false
    };

    const alertProps = Object.assign({}, modalProps, { title: "회원가입 완료!" });

    const typeProps = {
        type: type,
        onTypeChange: onTypeChange,
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
                        typeSumitted && !authSuccess &&
                        <Modal {...modalProps}>
                            <AuthenticationContainer
                                authApi={ getSignUpAuth }
                                onResultSubmit={ onResultSubmit }
                                description="본인인증을 위해 휴대폰 번호를 입력해주세요!"
                            />
                        </Modal>
                    }
                    {
                        authSuccess && !signupSuccess &&
                        <Modal {...modalProps}>
                            <SignupForm
                                onFormSubmit={ onFormSubmit }
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
                        <AuthenticationContainer
                            onResultSubmit={ onResultSubmit }
                            description="본인인증을 위해 휴대폰 번호를 입력해주세요!"
                        />
                    }
                    {
                        authSuccess && !signupSuccess &&
                        <SignupForm
                            onFormSubmit={ onFormSubmit }
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