import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGet } from '../../hooks';
import Section from "../../components/ui/Section/Section";
import UserAuthForm from '../../components/User/UserAuthForm/UserAuthForm';
import UserInfoForm from '../../components/User/UserInfoForm/UserInfoForm';
import Modal from '../../components/Modal/Modal';
import { activateAlert } from '../../store/actions/alert';
import { useNavigate } from 'react-router';
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import UserUnsubecribe from '../../components/User/UserUnsubscribe/UserUnsubscribe';
import { getUserInfoMatch } from '../../api/user';

const UserInfoContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 유저 아이디
    const USER_ID = useSelector(state => state.User.id);

    const [ passwordMatch, setPasswordMatch ] = useState(false);
    const [ failMsg, setFailMsg ] = useState("");
    const [ memo, setMemo ] = useState('사용자 메모');

    const [ newPhoneMode, setNewPhoneMode ] = useState(false);
    const [ unsubscribeMode, setUnsubscribeMode ] = useState(false);

    const [ newPhoneSuccess, setNewPhoneSuccess ] = useState(false);
    const [ unsubscribeSuccess, setUnsubscribeSuccess ] = useState(false);
    const [ newInfoSuccess, setNewInfoSuccess ] = useState(false);

    
    const onPwdSubmit = async data => {
        console.log(data);
        
        const RESPONSE = await getUserInfoMatch(data);
        console.log(RESPONSE);
        if(RESPONSE) {
            // setPasswordMatch(true);
        } else {
            setFailMsg("아이디와 비밀번호가 일치하지 않습니다.");
        }
    };

    const onMemoChange = (event) => {
        setMemo(event.currentTarget.value)
    };

    const onUnsubsClick = () => {
        setUnsubscribeMode(true);
    };

    const onNewPhoneClick = (event) => {
        event.preventDefault();
        setNewPhoneMode(true);
        console.log('click');
    };

    const onResultSubmit = result => {
        setNewPhoneSuccess(true);
        setNewPhoneMode(false);
    };

    const onFormSubmit = data => {
        console.log(data);
        dispatch(activateAlert({
            title: "회원정보 수정 완료!",
            contents: "변경하신 회원정보가 정상적으로 변경되었습니다."
        }));
    };

    useEffect(() => {
        
    }, [  ])

    useEffect(() => {
        if(newPhoneSuccess) {
            dispatch(activateAlert({
                title: "연락처 변경 완료!",
                contents: "회원님의 새로운 연락처가 정상적으로  변경되었습니다!"
            }));
        }
    }, [newPhoneSuccess])

    const newPhoneModalProps = {
        title: "연락처 변경",
        description: "변경하실 연락처를 입력해주세요.",
        open: true,
        width: "360",
        close: true,
        onCloseClick: () => { 
            setNewPhoneMode(false); 
            setNewPhoneSuccess(false);
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
                        failMsg = { failMsg }
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
                        userType={"매도 희망인"}
                        userId={"bonoland@naver.com"}
                        userName={"아이덴잇"}
                        userPhoneNumber={"010-0000-0000"}
                        userMemo={ memo }
                        onMemoChange={ onMemoChange }
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
                        onResultSubmit={ onResultSubmit }
                    /> 
                </Modal>

            }
            { 
                unsubscribeMode && 
                <Modal {...unsubsModalProps}>
                    <UserUnsubecribe />
                </Modal> 
            }
        </>
    )
};

export default UserInfoContainer;