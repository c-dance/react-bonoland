import { userLogin, userLogout } from '../../api/user';
import { ALERT } from './alert';
import { USER_AUTH } from '../../utils/user';

export const USER = {
    LOGIN: 'login',
    LOGOUT: 'logout', 
};

export const login = data => async dispatch => {

    const RESPONSE = await userLogin(data);

    if(RESPONSE) {
        const LOGIN_SUCCESS = RESPONSE.status === 201;
    
        if(LOGIN_SUCCESS) {
            const USER_INFO = { 
                id: "asdf@asdf.com", 
                name: `김보노 (${new Date().getHours()}시 ${new Date().getMinutes()}분)`, 
                accessToken: "1234asdf", 
                refresToken: "123asdf" 
            }; // dummy data
            // const USER_INFO = RESPONSE.data;
            USER_AUTH.store(USER_INFO); // id, name, accessToken, refreshToken
            dispatch({
                type: USER.LOGIN,
                payload: {
                   id: USER_INFO.id,
                   name: USER_INFO.name
                }
            })
            dispatch({
                type: ALERT.ACTIVATE, 
                payload: {
                    title: "로그인 성공",
                    contents: RESPONSE.message || "로그인 성공"
                }
            })
            
        } else {
            dispatch({
                type: ALERT.ACTIVATE, 
                payload: {
                    title: "로그인 실패",
                    contents: RESPONSE.message || "다시 시도해 주세요"
                }
            })
        }

    } else {
        dispatch({
            type: ALERT.ACTIVATE,
            payload: {
                title: "로그인 오류", 
                contents: "다시 시도해 주세요."
            }
        })
    }
}

export const setLoggedIn = user => ({
    type: USER.LOGIN, 
    payload: {
        id: user.id,
        name: user.name
    }
});

export const logout = () => async dispatch => {
    await userLogout()
        .then(() => {
            USER_AUTH.remove();
            dispatch({ type: USER.LOGOUT })
        })
};
