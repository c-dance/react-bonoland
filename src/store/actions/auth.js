export const AUTH = {
    ACTIVATE: '/auth/activate',
    DEACTIVATE: '/auth/deactivate',
    CHECK_AUTHNUM: '/auth/match',
    SET_AUTHNUM: '/auth/authnum',
    GET_CHECK_MATCH: '/autn/matchResult',
    API: '/auth/authApi',
    GET_API_RESPONSE: '/auth/authApiResponse'
};

// 인증 활성화
export const activateAuth = data => ({
    type: AUTH.ACTIVATE,
    payload: data
});

// 인증 비활성화
export const deactivateAuth = () => ({
    type: AUTH.DEACTIVATE
});

// 인증번호 저장
export const updateAuthNum = authNum => ({
    type: AUTH.SET_AUTHNUM,
    payload: authNum
});

// 인증 후 api 시도
export const authApi = async data => {
    const RESPONSE = {};

    return RESPONSE;
};

