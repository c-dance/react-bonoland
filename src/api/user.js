import api, { consoleErr, authHeader } from ".";
import axios from "axios";

const USER_URL = {
    login: '/user/loginProc',
    signUp: '/user/joinProc',
    findId: '/user/findEmailProc',
    findPwd: '/user/findPwdProc',
    newPwd: '/user/modifyPwdProc',
    localAlarm: "/user/localAlerts",
    pwdCheck: '/user/userPwdCheck',
    changeUserInfo: '/user/infoChangeProc',
    unsubscribe: '/user/userWthdr'
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
});

/* === 회원 정보 === */
export const getPasswordMatch = async user => await api.post(USER_URL.pwdCheck, {
    userEmail: user.userEmail,
    userPwd: user.userPwd
});

/* === 회원 정보 변경 === */
export const modifyUserInfo = async user => await api.post(USER_URL.changeUserInfo, {
    userEmail: user.userEmail,
    userPwd: user.userPwd,
    userMemo: user.userMemo
});

/* === 회원 정보 가져오기 === */
// export const getUserInfo = async user => await api.get();

/* === 회원 탈퇴 === */
export const UserUnsubecribe = async userId => await api.post(USER_URL.unsubscribe, {
    userEmail: userId
});




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
