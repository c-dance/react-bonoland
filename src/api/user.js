import api, { consoleErr, authHeader } from ".";
import axios from "axios";

const USER_URL = {
    login: '/user/loginProc',
    signUp: '/user/joinProc',
    findId: '/user/findEmailProc',
    findPwd: '/user/findPwdProc',
    newPwd: '/user/modifyPwdProc',
    localAlarm: "/user/localAlerts"
};

/* === 로그인 === */
export const userLogin = async user => await api.post(USER_URL.login, {
    userEmail : user.id,
    userPwd : user.password
});

/* === 회원가입 === */
export const userSignup = async user => await api.post(USER_URL.signUp, {
    userName: user.userName,
    userEmail: user.userId, 
    userTel: user.userTel,
    userPwd: user.userPwd01,
    userCtg: user.userCtg,
    userState: 1
});

export const setUserLocalAlarm = async data => await api.post(USER_URL.localAlarm, {
    userEmail : data.userEamil,
    localAlertsDepth1 : data.sidos,
    localAlertsDepth2 : data.gyeonggidos
})


/* === LOGOUT === */
export const userLogout = async () => {
    const source = axios.CancelToken.source();
    // const url = '/logout';
    const url = '';

    try {
        const response = await api.get(url, {
            cancelToken: source.token
        });

        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};


/* === UNSUBSCRIBE === */
export const UserUnsubecribe = async user => {
    const source = axios.CancelToken.source();
    // const url = '/user/unsubscribe';
    const url = 'http://localhost:3500/user';

    try {
        const response = await api.post(url,{
            userEmail: user.id,
            userAgree: user.agreement
        },{ 
            cancelToken: source.token
        });
        return response;
    } catch(err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

/* === GET USER INFORMATION === */
export const getUserInfo = async user => {
    const source = axios.CancelToken.source();
    // const url = '/user/userInfo';
    const url = 'http://localhost:3500/userInfo';
    try {
        const response = await api.get(url,{ 
            params: {
                userEmail: user.id,
                userPwd: user.password
            },
            cancelToken: source.token, 
            
        });
        return response;
    } catch(err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

/* === MODIFY USER INFORMATION === */
export const modifyUserInfo = async user => {
    const source = axios.CancelToken.source();
    // const url = '/user/userInfo';
    const url = 'http://localhost:3500/user';

    try {
        const response = await api.post(url,{
            userPwd: user.password,
            userMemo: user.memo
        },{ 
            cancelToken: source.token, 
            
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
            cancelToken: source.token 
        });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
