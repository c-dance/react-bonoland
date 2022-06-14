import api, { consoleErr, authHeader } from ".";
import axios from "axios";
import { USER_AUTH } from "../utils/user";

/* === 회원 가입  === */
export const userSignup = async user => {
    console.log('회원가입');

    const source = axios.CancelToken.source();
    // const url = '/signup';
    const url = '';

    try {
        const response = await api.post(url, {
            type: user.type,
            phone: user.phone,
            id: user.id, 
            password: user.password,
            name: user.name,
            agreement: user.agreement
        }, { cancelToken: source.token });
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        source.cancel();
    }
}

/* === 로그인 === */
export const userLogin = async user => {
    console.log('로그인');

    const source = axios.CancelToken.source();
    // const url = '/login';
    const url = '';

    try {
        const response = await api.post(url, {
            id: user.id,
            password: user.password
        }, { cancelToken: source.token });
        
        const tokens = [response.data.accessToken, response.data.refreshToken];
        USER_AUTH.store(tokens); 

        return response;

    } catch (err) {
        console.log(err);
    } finally {
        source.cancel();
    }
}

/* === 로그아웃 === */
export const userLogout = async () => {
    console.log('로그아웃');

    const source = axios.CancelToken.source();
    // const url = '/logout';
    const url = '';

    try {
        const response = await api.get(url, {
            headers: authHeader(),
            cancelToken: source.token
        });

        USER_AUTH.remove();

        return response;

    } catch (err) {
        console.log(err);
    } finally {
        source.cancel();
    }
}

/* === 회원 정보 수정 === */







/* === 최근 본 매물 가져오기 === */
export const getUserRecentCenters = async id => {
    console.log('회원 최근 본 매물');

    const source = axios.CancelToken.source();
    // const url = '/recentcenters';
    const url = 'data02/recentcenters.json';

    try {
        const response = await api.get(url , { 
            headers: authHeader(),
            cancelToken: source.token 
        });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

/* === 스크랩 매물 가져오기 === */
export const getUserScrapCenters = async id => {
    console.log('회원 스크랩 목록');

    const source = axios.CancelToken.source();
    // const url = '/scrapcenters';
    const url = 'data02/scrapcenters.json';

    try {
        const response = await api.get(url , { 
            headers: authHeader(),
            cancelToken: source.token 
        });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

/* === 알람 매물 가져오기 === */
export const getUserAlarmCenters = async id => {
    console.log('회원 알람 목록');

    const source = axios.CancelToken.source();
    // const url = '/alarmcenters';
    const url = 'data02/alarmcenters.json';

    try {
        const response = await api.get(url , { 
            headers: authHeader(),
            cancelToken: source.token 
        });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
