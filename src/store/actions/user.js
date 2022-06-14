import { userLogin, userLogout } from '../../api/user';
import { ALERT } from './alert';

export const USER = {
    LOGIN: 'login',
    LOGOUT: 'logout', 
};

export const login = data => async dispatch => {

    const response = await userLogin(data);

    // if(response.status === 200) {
    //     console.log(response.data[0]);
    //     dispatch({
    //         type: USER.LOGIN,
    //         payload: {
    //            id: response.data.userId,
    //            name: response.data.userName
    //         },
    //     })
    //     return true;
    // } else {
    //     return false;
    // }

    // jsonserver test
    if(response.data.length > 0) {
        console.log(response.data[0]);
        dispatch({
            type: USER.LOGIN,
            payload: {
               id: 'asdf@asdf.com',
               name: '홍길동'
            },
        })
    } else {
        return false;
    }
}

export const setLoggedIn = user => {
    console.log(user);
    return ({
    type: USER.LOGIN, 
    payload: {
        id: user.id,
        name: user.name
    }
});
}

export const logout = () => async dispatch => {
    await userLogout()
        .then(() => {
            dispatch({ type: USER.LOGOUT })
        })
};
