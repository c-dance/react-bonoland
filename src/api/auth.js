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

/* === 전화번호 인증 : 인증결과 받기 === */
export const getAuthResult = async (phoneNumber, authNumber) => {
    const source = axios.CancelToken.source();
    // const url = '/user/authNumCheck';
    const url = 'http://localhost:3500/auth';
    
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
