import api, { consoleErr } from '.';
import axios from 'axios';

/* === 전화번호 인증 : 인증번호 받기 === */
export const getAuthNumber = phoneNumber  => {
    const source = axios.CancelToken.source();
    const url = '/auth/phone';
    
    try {
        const response = api.post(url, {
            phoneNumber: phoneNumber
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

/* === 전화번호 인증 : 인증결과 받기 === */
export const getAuthResult = (phoneNumber, authNumber) => {
    const source = axios.CancelToken.source();
    const url = '/auth/phone';
    
    try {
        const response = api.post(url, {
            phoneNumber: phoneNumber, 
            authNumber: authNumber
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
