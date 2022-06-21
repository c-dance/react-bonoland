import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Section from "../../components/ui/Section/Section";
import UserAuthForm from '../../components/User/UserAuthForm/UserAuthForm';
import UserInfoForm from '../../components/User/UserInfoForm/UserInfoForm';
import Modal from '../../components/Modal/Modal';
import { activateAlert } from '../../store/actions/alert';
import { useNavigate } from 'react-router';
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import UserUnsubecribe from '../../components/User/UserUnsubscribe/UserUnsubscribe';
import { getPasswordMatch, modifyUserTel, modifyUserInfo  } from '../../api/user';
import { updateUserInfo, logout, unsubscribe } from '../../store/actions/user';


const UserInfoContainer = () => {

    const dispatch = useDispatch();

    // 회원정보 변경 모드
    const [ newPhoneMode, setNewPhoneMode ] = useState(false);
    const [ unsubscribeMode, setUnsubscribeMode ] = useState(false);

    // 패스워드 매칭 | 휴대전화번호 변경 | 정보 변경 
    const [ pwdMatchSuccess, setPwdMatchSuccess ] = useState(false);
    const [ newPhoneSuccess, setNewPhoneSuccess ] = useState(false);

    // 유저 정보
    const USER_INFO = useSelector(state => state.User.userInfo);
    const USER_ID = USER_INFO.id;
    const [ user, setUser ] = useState({});
    const [ newPhoneNumber, setNewPhoneNumber ] = useState("");

    // 비밀번호 체크 SUBMIT
    const onPwdMatchSubmit = async user => {
        const RESPONSE = await getPasswordMatch({ 
            userEmail: user.id, 
            userPwd: user.password 
        });

        if(RESPONSE && RESPONSE.data.code === 0) {
            setUser(USER_INFO);
        } else {
            dispatch(activateAlert({
                title: "회원정보 확인",
                contents: RESPONSE.data.message || "계정 정보 조회에 실패했습니다. 다시 시도해 주세요."
            }));
        }
        setPwdMatchSuccess(RESPONSE.data.code === 0);
    };

    // 전화번호 수정 api
    const modifyPhoneAuth = phoneNumber => modifyUserTel({ userEmail: user.id, userTel: phoneNumber});

    // 전화번호 저장 api
    const saveNewPhoneNumber = phoneNumber => { setNewPhoneNumber(phoneNumber)};

    // 전화번호 수정 api RESPONSE
    const onNewPhoneSubmit = async result => {
        const RESPONSE = result;
        if(RESPONSE && RESPONSE.data.code === 0) {
            dispatch(activateAlert({
                title: "연락처 변경 완료!",
                contents: "회원님의 새로운 연락처가 정상적으로 변경되었습니다!"
            }));
            setNewPhoneSuccess(true);
        } else {
            dispatch(activateAlert({
                title: "연락처 변경 실패",
                contents: RESPONSE.data.message || "다시 시도해 주세요"
            }));
        }
        setNewPhoneMode(false);
    };

    const onFormSubmit = async data => {

        const USER_INFO = { userEmail: user.id }
        const pwdChange = data.newPwd01.length > 0;
        const memoChange = user.memo != data.userMemo;

        if(!pwdChange && !memoChange) {
            return dispatch(activateAlert({
                title: "회원정보 수정",
                contents: "회원정보 변경 내역이 없습니다."
            }))
        } else {
            if(user.memo != data.userMemo) USER_INFO.userRemarks = data.userMemo;
            if(pwdChange) USER_INFO.userPwd = data
        }
        
        const RESPONSE = await modifyUserInfo(USER_INFO);

        if(RESPONSE && RESPONSE.data.code === 0) {
            dispatch(activateAlert({
                title: "회원정보 수정 완료!",
                contents: "변경하신 회원정보가 정상적으로 변경되었습니다."
            }));
            dispatch(updateUserInfo({ memo: data.userMemo }));
        } else {
            dispatch(activateAlert({
                title: "회원정보 수정 실패",
                contents: RESPONSE.data.message || "정보 수정에 실패했습니다. 다시 시도해 주세요."
            }));
        }
    };

    const onUnsubscribeSubmit = data => {
        if(data.agreement) {
            dispatch(unsubscribe(user.id));
        }
    }; 

    useEffect(() => {
        if(newPhoneSuccess === true) {
            dispatch(updateUserInfo({ tel: newPhoneNumber }));
            setNewPhoneSuccess(false);
        }
    }, [newPhoneSuccess])

    useEffect(() => {
        setUser(USER_INFO);
    }, [USER_INFO])

    const newPhoneModalProps = {
        title: "연락처 변경",
        description: "변경하실 연락처를 입력해주세요.",
        open: true,
        width: "360",
        close: true,
        onCloseClick: () => { setNewPhoneMode(false); }
    };

    const unsubsModalProps = {
        title: "회원탈퇴",
        width: "360",
        close: true,
        onCloseClick: () => { setUnsubscribeMode(false); }
    };

    return (
        <>
            {
                !pwdMatchSuccess && 
                <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
                    <UserAuthForm
                        id={ USER_ID }
                        onFormSubmit={ onPwdMatchSubmit }
                    />
                </Section>
            }
            {
                pwdMatchSuccess && 
                <Section
                    title="회원 정보 변경"
                    close={ true }
                    themeColor={ "primary" }
                >
                    <UserInfoForm
                        user={ user }
                        onUnsubsClick={ () => { setUnsubscribeMode(true); }}
                        onNewPhoneClick={ () => { setNewPhoneMode(true); } }
                        onFormSubmit={ onFormSubmit }
                    />
                </Section>
            }
            { 
                newPhoneMode && 
                <Modal {...newPhoneModalProps}>
                    <AuthenticationContainer
                        authApi={ modifyPhoneAuth }
                        onResultSubmit={ onNewPhoneSubmit }
                        onPhoneSave={ saveNewPhoneNumber }
                        description="변경하실 연락처를 입력해주세요."
                    /> 
                </Modal>
            }
            { 
                unsubscribeMode && 
                <Modal {...unsubsModalProps}>
                    <UserUnsubecribe 
                       onFormSubmit={ onUnsubscribeSubmit } 
                    />
                </Modal> 
            }
        </>
    )
};

export default UserInfoContainer;