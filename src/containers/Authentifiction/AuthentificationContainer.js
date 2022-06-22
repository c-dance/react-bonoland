import React, { useState, useEffect } from "react";
import Authentication from "../../components/Authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { activateAlert } from '../../store/actions/alert';
import { checkAuthNumber, updatePhoneNumber } from "../../store/actions/auth";

const AuthenticationContainer = () => {
    
    const dispatch = useDispatch();

    const AUTH = useSelector(state => state.Auth);
    const AUTH_DESCRIPTION = AUTH.description;
    const AUTH_SUCCESS = AUTH.success;
    const AUTH_NUMBER = AUTH.authNumber;
    const AUTH_PHONENUMBER = AUTH.phoneNumber;
    
    /* === 타이머 === */
    const TIME_LIMIT = 180;
    const [ timer, setTimer ] = useState(TIME_LIMIT);
    let intervalTimer;
    let timeout;
    
    /* === 인증번호 받기, 인증결과 === */
    const [ getAuth, setGetAuth ] = useState(false);
    const [ phoneNumberError, setPhoneNumberError ] = useState("");
    const [ authNumberError, setAuthNumberError ] = useState("");

    /* === 전화번호 제출 === */
    const onPhoneSubmit = async data => {
        dispatch(updatePhoneNumber(data.phoneNumber));
    }; 

    /* === 인증번호 제출 === */
    const onAuthSubmit = async data => {
        dispatch(checkAuthNumber(data.authNumber));
    };

    /* === 타이머 시작 === */
    const setIntervalTimer = () => {
        intervalTimer = window.setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);

        timeout = window.setTimeout(() => {
            clearIntervalTimer();
        }, TIME_LIMIT * 1000);
    };

    /* === 타이머 해제 === */
    const clearIntervalTimer = () => {
        window.clearTimeout(timeout);
        window.clearInterval(intervalTimer);
    };

    /* === 입력시간 초과 처리 === */
    const firetimer = () => {
        clearIntervalTimer();
        alert("입력시간이 초과되었습니다. 휴대폰 인증을 다시 시도해 주세요");
        setTimer(TIME_LIMIT);
        // setPhoneNumber("");
        setPhoneNumberError("");
        setAuthNumberError("");
        setGetAuth (false);
    };

    /* === 인증폼 PROPS === */
    const authProps = {
        // phoneNumber: phoneNumber,
        phoneNumber: AUTH_PHONENUMBER,
        onPhoneSubmit: onPhoneSubmit,
        onAuth: getAuth,
        timer: timer,
        onAuthSubmit: onAuthSubmit,
        // description: description, 
        description: AUTH_DESCRIPTION, 
        phoneNumberError: phoneNumberError,
        authNumberError: authNumberError
    };

    /* === 타이머 시작 처리 === */
    useEffect(() => {
        if(getAuth) {
            setIntervalTimer();
            return () => clearIntervalTimer();
        } else {
        }
    }, [getAuth]);

    /* === 타이머 자동 해제 === */
    useEffect(() => {
        if(timer <= 0) firetimer();
    }, [timer]);


    useEffect(() => {

        if(AUTH_NUMBER.length > 0){ 
            setGetAuth(true);
        } else {
            setGetAuth(false);
        }

        if(AUTH_SUCCESS) {
            // 성공처리는 api 갖다 쓰는 컴포넌트에서
        } else {
            console.log(AUTH.error)
            setAuthNumberError(AUTH.error);
        }

    }, [AUTH])

    return (
        <Authentication {...authProps}/>
    );
    
};

export default AuthenticationContainer;