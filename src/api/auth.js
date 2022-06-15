import api, { consoleErr } from '.';
import axios from 'axios';

/* === 전화번호 인증(계정찾기/정보조회) : 인증번호 받기 === */
export const getAuthNumber = async phoneNumber  => {
    const source = axios.CancelToken.source();
    // const url = '/user/authNumCheck';
    const url = 'http://localhost:3500/auth';
    
    try {
        const response = await api.post(url, {
            userTel: phoneNumber
        }, {
            cancelToken: source.token
        });
        console.log(response);
        return response;
    } catch(err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

const getAuth = async (authUrl, phoneNumber, authNumber) => {
    const source = axios.CancelToken.source();
    // const url = `/user/${authUrl}`;
    const url = `http://localhost:3500/${authUrl}`;
    
    try {
        const response = await api.post(url, {
            userTel: phoneNumber, 
            userAuth: authNumber
        }, {
            cancelToken: source.token
        });
        return response;
    } catch(err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getSignUpAuth = (phoneNumber, authNumber) => getAuth("auth", phoneNumber, authNumber);
export const getFindIdAuth = (phoneNumber, authNumber) => getAuth("auth", phoneNumber, authNumber);
export const getFindPwdAuth = (phoneNumber, authNumber) => getAuth("auth", phoneNumber, authNumber);
export const getNewPhoneAuth = (phoneNumber, authNumber) => getAuth("auth", phoneNumber, authNumber);

