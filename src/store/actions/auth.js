import { getAuthNumber } from "../../api/auth";

export const AUTH = {
    ACTIVATE: '/auth/activate',
    DEACTIVATE: '/auth/deactivate',
    RESET: '/auth/reset',
    SET_PHONENUMBER: '/auth/phonenum',
    SET_AUTHNUMBER: '/auth/authnum',
    CHECK_AUTHNUM: '/auth/match',
    SET_ERROR: '/auth/error',
    API: '/auth/authApi',
    GET_API_RESPONSE: '/auth/authApiResponse'
};

// 인증 활성화
export const activateAuth = settings => ({
    type: AUTH.ACTIVATE,
    payload: settings
});

// 인증 비활성화
export const deactivateAuth = () => ({
    type: AUTH.DEACTIVATE
});

// 인증 재시도(시간 초과)
export const resetAuth = () => ({
    type: AUTH.RESET
});

// 전화번호 저장 > 전화번호 저장하고 authnum 받아서 넣기
export const updatePhoneNumber = phoneNumber => async dispatch => {
    dispatch({
        type: AUTH.SET_PHONENUMBER,
        payload: phoneNumber
    });

    const RESPONSE = await getAuthNumber(phoneNumber);

    if(RESPONSE && RESPONSE.data.code === 1) {
        const authNumber = RESPONSE.data.data;
        console.log(RESPONSE);
        dispatch({
            type: AUTH.SET_AUTHNUMBER,
            payload: authNumber
        });
        alert(authNumber);
    } else {
        dispatch({
            type: AUTH.SET_ERROR,
            payload: '전화번호 전송에 실패했습니다. 전화번호를 다시 입력해 주세요.'
        });
    }
}

// 인증번호 저장
export const updateAuthNumber = authNum => ({
    type: AUTH.SET_AUTHNUMBER,
    payload: authNum
});

export const checkAuthNumber = userNum => ({
    type: AUTH.CHECK_AUTHNUM,
    payload: userNum
});

// 인증 후 api 시도
export const authApi = data => async dispatch => {
    const RESPONSE = {};

    return RESPONSE;
};

