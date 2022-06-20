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
import { getUserInfo, modifyUserInfo, getPasswordMatch } from '../../api/user';
import { getNewPhoneAuth } from '../../api/auth';


const UserInfoContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 유저 아이디
    const USER_ID = useSelector(state => state.User.userInfo.id);
    const [ passwordMatch, setPasswordMatch ] = useState(false);

    const [ user, setUser ] = useState({});
    const USER_INFO = useSelector(state => state.User.userInfo);

    const [ newPhoneMode, setNewPhoneMode ] = useState(false);
    const [ unsubscribeMode, setUnsubscribeMode ] = useState(false);

    const [ unsubscribeSuccess, setUnsubscribeSuccess ] = useState(false);
    const [ newInfoSuccess, setNewInfoSuccess ] = useState(false);

    
    const onPwdSubmit = async user => {
        // setPasswordMatch(true);
        // setUser(USER_INFO);

        const RESPONSE = await getPasswordMatch({ 
            userEmail: user.id, 
            userPwd: user.password 
        });

        if(RESPONSE && RESPONSE.data.code === 0) {
        } else {
            console.log("false");
            setPasswordMatch(false);
            dispatch(activateAlert({
                title: "회원정보 확인",
                contents: RESPONSE.data.message || "계정 정보 조회에 실패했습니다. 다시 시도해 주세요."
            }))
        }
    };

    const onUnsubsClick = () => {
        setUnsubscribeMode(true);
    };

    const onNewPhoneClick = event => {
        event.preventDefault();
        setNewPhoneMode(true);
    };

    const onResultSubmit = result => {
        const RESPONSE = result;
        if(RESPONSE) {
            // 성공 응답일 때
            dispatch(activateAlert({
                title: "연락처 변경 완료!",
                contents: "회원님의 새로운 연락처가 정상적으로 변경되었습니다!"
            }));
            setUser(user => ({...user, userTel: "새 전화번호"}))

            // 실패 응답일 때
            // dispatch(activateAlert({
            //     title: "연락처 변경 실패",
            //     contents: RESPONSE.message || "기존 연락처와 동일합니다."
            // }));

        } else {
            dispatch(activateAlert({
                title: "연락처 변경 실패",
                contents: "다시 시도해 주세요"
            }));
        }

        setNewPhoneMode(false);
    };

    const onFormSubmit = async data => {
        console.log(data);
        const RESPONSE = await modifyUserInfo(data);
        if(RESPONSE) {
            // 성공 응답일 때
            dispatch(activateAlert({
                title: "회원정보 수정 완료!",
                contents: "변경하신 회원정보가 정상적으로 변경되었습니다."
            }));
            // 실패 응답일 때
            // dispatch(activateAlert({
            //     title: "회원정보 수정 실패",
            //     contents: RESPONSE.message || "정보 수정에 실패했습니다. 다시 시도해 주세요."
            // }));
        } else {
            dispatch(activateAlert({
                title: "회원정보 수정 실패",
                contents: "정보 수정에 실패했습니다. 다시 시도해 주세요."
            }));
        }
    };

    const newPhoneModalProps = {
        title: "연락처 변경",
        description: "변경하실 연락처를 입력해주세요.",
        open: true,
        width: "360",
        close: true,
        onCloseClick: () => { 
            setNewPhoneMode(false); 
        }
    };

    const unsubsModalProps = {
        title: "회원탈퇴",
        open: true,
        width: "360",
        close: true,
        closeAction: true,
        onCloseClick: () => { 
            setUnsubscribeMode(false); 
            setUnsubscribeSuccess(false);
        }
    };

    return (
        <>
            {
                !passwordMatch && 
                <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
                    <UserAuthForm
                        id={ USER_ID }
                        onFormSubmit={ onPwdSubmit }
                    />
                </Section>
            }
            {
                passwordMatch && 
                <Section
                    title="회원 정보 변경"
                    close={ true }
                    themeColor={ "primary" }
                >
                    <UserInfoForm
                        user={ user }
                        onUnsubsClick={ onUnsubsClick }
                        onNewPhoneClick={ onNewPhoneClick }
                        onFormSubmit={ onFormSubmit }
                    />
                </Section>
            }
            { 
                newPhoneMode && 
                <Modal {...newPhoneModalProps}>
                    <AuthenticationContainer
                        authApi={ getNewPhoneAuth }
                        onResultSubmit={ onResultSubmit }
                        description="변경하실 연락처를 입력해주세요."
                    /> 
                </Modal>
            }
            { 
                unsubscribeMode && 
                <Modal {...unsubsModalProps}>
                    <UserUnsubecribe 
                        
                    />
                </Modal> 
            }
        </>
    )
};

export default UserInfoContainer;