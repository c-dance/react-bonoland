import api, { consoleErr, authHeader } from ".";
import axios from "axios";

/* === LOGIN === */
export const userLogin = async user => {
    const source = axios.CancelToken.source();
    // const url = 'http://localhost:3500/login';
    // const url = 'user/loginProc';

    console.log(user);

    try {
        const response = await axios.post("/user/loginProc", {
            userEmail : user.userId,
            userPwd : user.userPwd
        }, { 
            cancelToken: source.token
        });
        return response;
    } catch(err) {
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

/* === SIGN_UP === */
export const userSignup = async user => {

    const source = axios.CancelToken.source();
    // const url = '/user/joinProc';
    // const url = '/user/joinProc';

    try {
        // const response = await axios.get('https://random-data-api.com/api/app/random_app', {
        //     userName: user.name,
        //     userEmail: user.id, 
        //     userTel: user.phone,
        //     userPwd: user.password,
        //     userCtg: user.type,
        //     userState: 1
        //     // userAgreement: user.agreement
        // }, { 
        //     cancelToken: source.token,
        // });
        const response = await axios.post('https://bonoland.co.kr/user/joinProc', {
            userName: user.name,
            userEmail: user.id, 
            userTel: user.phone,
            userPwd: user.password,
            userCtg: user.type,
            userState: 1
            // userAgreement: user.agreement
        }, { 
            cancelToken: source.token,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':  'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    } finally {
        source.cancel();
    }
}

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
            cancelToken: source.token, 
            headers: authHeader()
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
            headers: authHeader()
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
            headers: authHeader()
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
