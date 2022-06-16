import api from '.';

const AUTH_URL = {
    authNum: '/user/authNumCheck', 
    signUpAuth: '/user/joinAuthProc', 
    findIdAuth: '/user/findEmailProc',
    findPwdAuth: '',
    newPhone: '',
}

export const getAuthNumber = async phoneNumber  => {
    const RESPONSE = await api.post(AUTH_URL.authNum, phoneNumber);
    return RESPONSE;
};

const getAuth = async (authUrl,authNumber) => {
    const RESPONSE = await api.post(authUrl, authNumber);
    return RESPONSE;
};

export const getSignUpAuth = authNumber => getAuth(AUTH_URL.signUpAuth,authNumber);
export const getFindIdAuth = authNumber => getAuth(AUTH_URL.findIdAuth, authNumber);
export const getFindPwdAuth = authNumber => getAuth(AUTH_URL.findPwdAuth, authNumber);
export const getNewPhoneAuth = authNumber => getAuth(AUTH_URL.newPhone, authNumber);

