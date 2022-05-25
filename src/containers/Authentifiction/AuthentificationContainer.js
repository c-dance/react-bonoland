import { useState, useEffect } from "react";
import Authentication from "../../components/Authentication/Authentication";
import { useSelector } from "react-redux";

const AuthenticationContaienr = ({ handleAuth }) => {
    
    // 전화번호 입력
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ phoneSubmitted, setPhoneSubmitted ] = useState(false);
    
    // 인증번호 입력
    const [ authCount, setAuthCount ] = useState(0);
    const [ authNumber, setAuthNumber ] = useState('');
    const [ authPassed, setAuthPassed ] = useState(false);

    // 전화번호 폼 제출
    const onPhoneSubmit = (event) => {
        event.preventDefault();
        // 전화번호 유효성 검증
        console.log(phoneNumber);
        setPhoneSubmitted(true);
        setAuthCount(100);
    }; 

    // 인증번호 폼 제출
    const onAuthSubmit = (event) => {
        event.preventDefault();
        console.log(phoneNumber);
        // 인증번호 받아오기 fetch
        const authPassword = '1234';

        if(authCount <= 0) {
            alert('인증 시간이 경과하였습니다. 다시 시도해 주세요.');
            setAuthNumber('');
            setAuthCount(0);
            setPhoneSubmitted(false);
            return;
        }

        if(authNumber === authPassword) {handleAuth(true);}
        else alert('인증번호가 맞지 않습니다.')
    };

    const authProps = {
        phoneNumber: phoneNumber,
        onPhoneChange: setPhoneNumber,
        onPhoneSubmit: onPhoneSubmit,
        onAuth: phoneSubmitted,
        authCount: authCount,
        authNumber: authNumber,
        onAuthChange: setAuthNumber,
        onAuthSubmit: onAuthSubmit
    };

    return (
        <Authentication {...authProps}/>
    )
    
};

export default AuthenticationContaienr;