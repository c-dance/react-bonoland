import api, { consoleErr, authHeader } from ".";
import axios from "axios";
import { USER_AUTH } from "../utils/user";
import { TYPE_AND_EXPENDITURE } from "../sheme/calculator";

/* === LOGIN === */
export const userLogin = async user => {
    const source = axios.CancelToken.source();
    const url = 'http://localhost:3500/login';
    // const url = '/user/loginProc';

    try {
        const response = await api.post(url, {
            userEamil: user.id,
            usePwd: user.password
        }, { 
            cancelToken: source.token 
        });

        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
}

/* === LOGOUT === */
export const userLogout = async () => {
    const source = axios.CancelToken.source();
    // const url = '/logout';
    const url = '';

    try {
        const response = await api.get(url, {
            headers: authHeader(),
            cancelToken: source.token
        });

        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
}

/* === 회원 가입  === */
export const userSignup = async user => {
    const source = axios.CancelToken.source();
    // const url = '/user/joinProc';
    const url = 'http://localhost:3500/signup';

    try {
        const response = await api.post(url, {
            userName: user.name,
            userEamil: user.id, 
            userTel: user.phone,
            userPwd: user.password,
            userCtg: user.type,
            userState: 1, // [? 값 확인 필요]
            userAgreement: user.agreement
        }, { cancelToken: source.token });
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        source.cancel();
    }
}

/* === 비밀번호 일치 확인 === */
export const getUserInfoMatch = async user => {
    console.log("회원정보 일치 확인");
    
    const source = axios.CancelToken.source();
    // const url = '/user/auth';
    const url = 'http://localhost:3500/login';
    try {
        const response = await api.get(url, { 
            params: {
                id: user.id,
                password: user.password
            },
            cancelToken: source.token 
        });
        return response;
    } catch(err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};





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
