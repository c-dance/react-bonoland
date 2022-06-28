import React, { useState, useEffect } from "react";
import Authentication from "../../components/Authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { activateAlert } from '../../store/actions/alert';
import { checkAuthNumber, resetAuth, updatePhoneNumber } from "../../store/actions/auth";

const AuthenticationContainer = () => {
    
    const dispatch = useDispatch();

    const AUTH = useSelector(state => state.Auth);
    const AUTH_ACTIVE = AUTH.active;
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
            if(!AUTH_ACTIVE) firetimer();
            setTimer(timer => timer - 1);
            console.log(timer);
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
    const firetimer = (AUTH_SUCCESS = false) => {
        clearIntervalTimer();
        setTimer(TIME_LIMIT);
        setAuthNumberError("");
        setGetAuth (false);
        if(!AUTH_SUCCESS) {
            dispatch(resetAuth());
            alert("입력시간이 초과되었습니다. 휴대폰 인증을 다시 시도해 주세요");
        }
    };

    /* === 인증폼 PROPS === */
    const authProps = {
        phoneNumber: AUTH_PHONENUMBER,
        onPhoneSubmit: onPhoneSubmit,
        onAuth: getAuth,
        timer: timer,
        onAuthSubmit: onAuthSubmit,
        description: AUTH_DESCRIPTION, 
        authNumberError: authNumberError
    };

    /* === 타이머 시작 처리 === */
    useEffect(() => {
        if(getAuth) {
            setIntervalTimer();
            return () => clearIntervalTimer();
        }
    }, [getAuth]);

    /* === 타이머 자동 해제 === */
    useEffect(() => {
        if(timer <= 0) firetimer();
    }, [timer]);

    useEffect(() => {
        setGetAuth(AUTH_NUMBER.length > 0);
    }, [AUTH_NUMBER])

    useEffect(() => {
        if(AUTH_SUCCESS) firetimer(AUTH_SUCCESS);
        else setAuthNumberError(AUTH.error);
    }, [AUTH_SUCCESS])

    return (
        <Authentication {...authProps}/>
    );
    
};

export default AuthenticationContainer;