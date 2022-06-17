import React, { useState, useEffect } from "react";
import Authentication from "../../components/Authentication/Authentication";
import { getAuthNumber } from '../../api/auth';
import { useDispatch } from "react-redux";
import { activateAlert } from '../../store/actions/alert';

const AuthenticationContainer = ({ 
    authApi,
    onResultSubmit,
    onPhoneSave = () => {},
    description 
}) => {
    
    const dispatch = useDispatch();

    /* === 전화번호 | 인증번호 === */
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ authNum, setAuthNum ] = useState('');
    
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
        const RESPONSE = await getAuthNumber(data.phoneNumber);

        if(RESPONSE && RESPONSE.data.code === 1) {
            const AUTH_NUM = RESPONSE.data.message.substring(RESPONSE.data.message.length - 6);
            setPhoneNumber(data.phoneNumber);
            setAuthNum(AUTH_NUM);
            setGetAuth(true);
            alert(AUTH_NUM);
        } else {
            setGetAuth(false);
            setPhoneNumberError('전화번호 전송에 실패했습니다. 전화번호를 다시 입력해 주세요.');
        }
    }; 

    /* === 인증번호 제출 === */
    const onAuthSubmit = async data => {
        if(data.authNumber !== authNum) {
            setAuthNumberError("인증번호가 일치하지 않습니다.");
        } else {
            const RESPONSE = await authApi(phoneNumber);
            onPhoneSave(phoneNumber);
            if(RESPONSE) onResultSubmit(RESPONSE);
            else onResultSubmit(null);
        }
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
        setPhoneNumber("");
        setPhoneNumberError("");
        setAuthNumberError("");
        setGetAuth (false);
    };

    /* === 인증폼 PROPS === */
    const authProps = {
        phoneNumber: phoneNumber,
        onPhoneSubmit: onPhoneSubmit,
        onAuth: getAuth,
        timer: timer,
        onAuthSubmit: onAuthSubmit,
        description: description, 
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

    return (
        <Authentication {...authProps}/>
    );
    
};

export default AuthenticationContainer;