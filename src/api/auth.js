import api from '.';

const AUTH_URL = {
    authNum: '/user/authNumCheck', 
    signUpAuth: '/user/joinAuthProc', 
    findIdAuth: '/user/findEmailProc',
    findPwdAuth: '/user/findPwdProc',
    newPhone: '',
}

export const getAuthNumber = async phoneNumber  => await api.post(AUTH_URL.authNum, phoneNumber);

export const getSignUpAuth = async authNumber => await api.post(AUTH_URL.signUpAuth,authNumber);
export const getFindIdAuth = async authNumber => await api.post(AUTH_URL.findIdAuth, authNumber);
export const getFindPwdAuth = async authNumber => await api.post(AUTH_URL.findPwdAuth, authNumber);
export const getNewPhoneAuth = async authNumber => await api.post(AUTH_URL.newPhone, authNumber);

