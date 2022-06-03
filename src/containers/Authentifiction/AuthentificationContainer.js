import React, { useState, useEffect } from "react";
import Authentication from "../../components/Authentication/Authentication";
import { useSelector, useDispatch } from "react-redux";
import { addAuth, updateAuth, deleteAuth } from "../../store/actions/auth";

const AuthenticationContainer = ({ onAuthSend }) => {

    const dispatch = useDispatch();
    let authentificated = useSelector(state => state.Auth.authentificated);
    let mode = useSelector(state => state.Mode);
    
    // 전화번호 입력
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ validPhoneNumber, setValidPhoneNumber ] = useState(true);
    const [ phoneSubmitted, setPhoneSubmitted ] = useState(false);

    // 입력 시간
    const [ timer, setTimer ] = useState(0);
    const [ timeOut, setTimeOut ] = useState(false);
    
    // 인증번호 입력
    const [ authNumber, setAuthNumber ] = useState('');

    // 전화번호 폼 제출
    const onPhoneSubmit = (event) => {
        event.preventDefault();
        
        // 스토어에 전화번호 저장 ( 서버에 post + 저장 )
        // dispatch(addAuth(phoneNumber));
        setTimer(100);
        setPhoneSubmitted(true);
    }; 

    const resetAuthentification = () => {
        dispatch(deleteAuth());
        setPhoneSubmitted(false);
        setAuthNumber('');
        setTimer(0);
        setTimeOut(false);
    };

    // 인증번호 폼 제출
    const onAuthSubmit = (event) => {
        event.preventDefault();

        dispatch(updateAuth(true));

        setTimeOut(function(){
            if(timeOut) {
                alert('인증 시간이 경과하였습니다. 다시 시도해 주세요.');
                resetAuthentification();
                return;
            };
    
            if(!authentificated) {
                alert("인증에 실패했습니다.");  
                resetAuthentification();
                return;
            };
        }, 3000);


        // onAuthSend(authentificated);
    };

    const authProps = {
        phoneNumber: phoneNumber,
        onPhoneChange: setPhoneNumber,
        onPhoneSubmit: onPhoneSubmit,
        onAuth: phoneSubmitted,
        timer: timer,
        authNumber: authNumber,
        onAuthChange: setAuthNumber,
        onAuthSubmit: onAuthSubmit
    };

    return (
        <Authentication {...authProps}/>
    )
    
};

export default AuthenticationContainer;