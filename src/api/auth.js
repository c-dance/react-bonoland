import api from '.';

const AUTH_URL = {
    authNum: '/user/authNumCheck', 
    signUpAuth: '/user/userTelCheck', 
    findIdAuth: '/user/findEmailProc',
    findPwdAuth: '/user/findPwdProc',
    newPwdAuth: '/user/modifyPwdProc',
    newPhone: '',
}

export const getAuthNumber = async phoneNumber  => await api.post(AUTH_URL.authNum, { userTel: phoneNumber });

export const getSignUpAuth = async phoneNumber => await api.post(AUTH_URL.signUpAuth, { userTel: phoneNumber });
export const getFindIdAuth = async phoneNumber => await api.post(AUTH_URL.findIdAuth, { userTel: phoneNumber });
export const getFindPwdAuth = async phoneNumber => await api.post(AUTH_URL.findPwdAuth, { userTel: phoneNumber });
export const getNewPwdAuth = async pwdString => await api.post(AUTH_URL.newPwdAuth, { userPwd: pwdString });
export const getNewPhoneAuth = async phoneNumber => await api.post(AUTH_URL.newPhone,  { userTel: phoneNumber });

