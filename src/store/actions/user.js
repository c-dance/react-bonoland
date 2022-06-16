import { userLogin, userLogout } from '../../api/user';
import { ALERT } from './alert';
import { USER_AUTH } from '../../utils/user';

export const USER = {
    LOGIN: 'login',
    LOGOUT: 'logout', 
};

export const login = data => async dispatch => {
    const RESPONSE = await userLogin(data);

    console.log(RESPONSE);

    if(RESPONSE && RESPONSE.data.code === 1) {
        const USER_INFO = { 
            id: RESPONSE.data.result.userEmail,
            name: RESPONSE.data.result.userName, 
            // type: RESPONSE.data.result.userCtg,
            tel: RESPONSE.data.result.userTel
        };

        USER_AUTH.store(USER_INFO); 

        dispatch({
            type: USER.LOGIN,
            payload: USER_INFO
        })  
    } else {
        dispatch({
            type: ALERT.ACTIVATE, 
            payload: {
                title: "로그인 실패",
                contents: RESPONSE.data.message || "다시 시도해 주세요"
            }
        })
    }   
}

export const setLoggedIn = user => ({
    type: USER.LOGIN, 
    payload: user
});

export const logout = () => async dispatch => {
    await userLogout()
        .then(() => {
            USER_AUTH.remove();
            dispatch({ type: USER.LOGOUT })
        })
};
