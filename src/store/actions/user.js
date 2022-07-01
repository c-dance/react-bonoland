import { userLogin } from '../../api/user';
import { USER_AUTH, USER_ID } from '../../utils/user';

export const USER = {
    LOGIN: '/user/login',
    LOGOUT: '/user/logout', 
    UPDTATE: '/user/update'
};

export const login = data => async dispatch => {
    const RESPONSE = await userLogin(data);

    if(RESPONSE && RESPONSE.data.code === 1) {
        console.log(RESPONSE);
        const USER_INFO = { 
            no: RESPONSE.data.result.userNo,
            type: RESPONSE.data.result.userCtg,
            id: RESPONSE.data.result.userEmail,
            name: RESPONSE.data.result.userName, 
            tel: RESPONSE.data.result.userTel,
            alarms: RESPONSE.data.result["localAlertsDepth1"],
            memo: RESPONSE.data.result.userRemarks
        };

        USER_AUTH.store(USER_INFO); 

        dispatch({
            type: USER.LOGIN,
            payload: USER_INFO
        })  
    }
    
    return ({
        success: RESPONSE && RESPONSE.data.code === 1,
        message: RESPONSE.data.message || "아이디 또는 비밀번호가 일치하지 않습니다."
    });
}

export const setLoggedIn = user => ({
    type: USER.LOGIN, 
    payload: user
});

export const updateUserInfo = user => {
    const USER_INFO = {...USER_AUTH.get(), ...user};
    USER_AUTH.store(USER_INFO);
    return {
        type: USER.UPDTATE,
        payload: USER_INFO
    }
};

export const logout = () => {
    USER_AUTH.remove();
    return {
        type: USER.LOGOUT
    }
};


