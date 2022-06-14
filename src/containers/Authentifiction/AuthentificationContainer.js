import React, { useState, useEffect } from "react";
import Authentication from "../../components/Authentication/Authentication";
import { useSelector, useDispatch } from "react-redux";
import { activateAlert } from '../../store/actions/alert';

const AuthenticationContainer = ({ onResultSubmit, description }) => {

    const dispatch = useDispatch();
    
    // 전화번호 입력
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ phoneSubmitted, setPhoneSubmitted ] = useState(false);

    // 입력 시간
    const TIME_LIMIT = 180;
    const [ timer, setTimer ] = useState(TIME_LIMIT);
    let intervalTimer;
    let timeout;

    // 인증번호 매칭
    const [ matchError, setMatchError ] = useState(false);

    /* === 전화번호 제출 === */
    const onPhoneSubmit = data=> {
        console.log(data);

        setPhoneNumber(data.phone);

        // 스토어에 전화번호 저장 ( 서버에 post + 저장 )
        setPhoneSubmitted(true);
    }; 

    /* === 인증번호 제출 === */
    const onAuthSubmit = data => {
        console.log(data);
        const ANSWER = "123";

        if(data.auth === ANSWER) {
            onResultSubmit(true);
        } else {
            setMatchError(true);
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
        setPhoneSubmitted(false);
    };

    /* === 인증폼 PROPS === */
    const authProps = {
        phoneNumber: phoneNumber,
        onPhoneSubmit: onPhoneSubmit,
        onAuth: phoneSubmitted,
        timer: timer,
        onAuthSubmit: onAuthSubmit,
        description: description, 
        matchError: matchError
    };

    /* === 타이머 시작 처리 === */
    useEffect(() => {
        if(phoneSubmitted) {
            setIntervalTimer();
            return () => clearIntervalTimer();
        }
    }, [phoneSubmitted]);

    /* === 타이머 자동 해제 === */
    useEffect(() => {
        if(timer <= 0) firetimer();
    }, [timer]);

    return (
        <Authentication {...authProps}/>
    );
    
};

export default AuthenticationContainer;