import api, { consoleErr, authHeader } from ".";
import axios from "axios";

const USER_URL = {
    login: '/user/loginProc',
    signUp: '/user/joinProc',
    unsubscribe: '/mypage/userWthdr', 
    pwdMatch: '/mypage/userPwdCheck',
    modify: {
        tel: '/mypage/userTelCheangeProc',
        info: '/mypage/infoChangeProc',
        password: '/user/modifyPwdProc'
    },
    localAlam: {
        save: '/mypage/localAlerts',
        list: '/mypage/localAlertsList'
    },
    scrap: {
        save: '/mypage/saveJjim',
        salesList: '/mypage/saveJjimBonoList',
        centersList: '/mypage/saveJjimSisulList',
    },
    recentList: '/mypage/recentlySale'
};

/*  로그인  */
export const userLogin = async user => await api.post(USER_URL.login, {
    userEmail : user.id,
    userPwd : user.password
});

/*  회원가입  */
export const userSignup = async user => await api.post(USER_URL.signUp, {
    userName: user.userName,
    userEmail: user.userId, 
    userTel: user.userTel,
    userPwd: user.userPwd01,
    userCtg: user.userCtg,
    userState: 1
});

/*  회원 탈퇴  */
export const userUnsubscribe = async userId => await api.post(USER_URL.unsubscribe, { userEmail: userId });

/*  아이디|비밀번호 매칭 확인  */
export const getPasswordMatch = async user => await api.post(USER_URL.pwdMatch, {
    userEmail: user.userEmail,
    userPwd: user.userPwd
});

/*  회원 휴대전화번호 변경 = */
export const modifyUserTel = async user => await api.post(USER_URL.modify.tel, {
    userEmail: user.userEmail,
    userTel: user.userTel
});

/*  회원 비밀번호 변경  */
export const modifyUserPwd = async user => await api.post(USER_URL.modify.password, { 
    userTel: user.userTel,
    userPwd: user.userPwd 
});

/*  회원 정보 변경  */
export const modifyUserInfo = async user => await api.post(USER_URL.modify.info, user);

/*  지역 알람 설정  */
export const setUserLocalAlarm = async data => await api.post(USER_URL.localAlam.save, {
    userEmail : data.userEamil,
    localAlertsDepth1 : data.localAlertsDepth1
});

/*  지역 알람 목록 가져오기  */
export const getUserLocalAlarm = async userNo => await api.post(USER_URL.scrap.list, {
    userNo: userNo
});

/*  최근 본 매물 목록 가져오기  */
export const getUserRecentCenters = async userNo => await api.get(USER_URL.recentList, {
    userNo: userNo
});

/*  스크랩 등록/해제  */
export const setUserScrap = async data => await api.post(USER_URL.scrap.save, {
    userNo: data.userNo,
    centerNo: data.centerNo
});

/*  스크랩 시설 목록 가져오기  */
export const getUserScrapCenters = async userNo => await api.get(USER_URL.scrap.centersList, {
    userNo: userNo
})

/*  스크랩 메물 목록 가져오기  */
export const getUserScrapSales = async userNo => await api.get(USER_URL.scrap.salesList, {
    userNo: userNo
})