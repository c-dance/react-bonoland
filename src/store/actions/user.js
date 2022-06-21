import { userLogin } from '../../api/user';
import { ALERT } from './alert';
import { USER_AUTH, USER_ID } from '../../utils/user';
import { LOGIN } from './mode';

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
            type: RESPONSE.data.result.userCtg,
            id: RESPONSE.data.result.userEmail,
            name: RESPONSE.data.result.userName, 
            tel: RESPONSE.data.result.userTel,
            memo: RESPONSE.data.result.userRemarks
        };

        USER_AUTH.store(USER_INFO); 

        dispatch({
            type: USER.LOGIN,
            payload: USER_INFO
        })  
    } else {
        dispatch({
            type: LOGIN.DEACTIVATE,
            payload: false
        })
        dispatch({
            type: ALERT.ACTIVATE, 
            payload: {
                title: "로그인 실패",
                contents: RESPONSE.data.message || "계정을 찾을 수 없습니다. 다시 시도해 주세요"
            }
        })
    }   
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


