import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Contact from '../../components/Contact/Contact';
import { isBrowser, isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { activateAlert } from '../../store/actions/alert';
import { contactCenter } from '../../api/service';
import { USER_AUTH } from '../../utils/user';


const ContactContainer = () => {

    const dispatch = useDispatch();
    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    // 개인정보 활용동의 (1) 약관 받아오기
    const [ term, setTerm ] = useState('');

    // 개인정보 활용동의 (1) 활용동의 체크 (2) 활용동의 저장
    const [ agreeSubmitted, setAgreeSubmitted ] = useState(false);

    // 로그인 되었을 때
    const [ user, setUser ] = useState({ uName: "", uEmail: "", uTel: "" });
    
    // 매수문의 닫기
    const navigate = useNavigate();
    const deactivatContact = () => {
        navigate('/');
    };

    // 약관 동의 제출
    const onAgreeSubmit = data => setAgreeSubmitted(data.agree);

    // 문의 폼 제출
    const onFormSubmit = async data => {
        const RESPONSE = await contactCenter(data);

        if(RESPONSE) {
            deactivatContact();
            dispatch(activateAlert({
                title:"매수 문의",
                contents: RESPONSE.data.message || "매수 문의가 완료되었습니다."
            }));
        } else {
            dispatch(activateAlert({
                title:"문의 접수 오류",
                contents: "문의 접수 중 오류가 발생했습니다."
            }))
        }
    };

    useEffect(() => {
        if(IS_LOGGEDIN) {
            const USER = USER_AUTH.get();
            console.log(USER);
            setUser({
                uEmail: USER.id,
                uName: USER.name,
                uTel: USER.tel
            });
        }
    }, [])


    const RENDER_CONTACT = () => (
        <>
            {
                !agreeSubmitted && 
                <Agreement
                    subTitle="개인정보 수집 동의"
                    label="개인정보수집에 대한 내용에 동의합니다."
                    content={ term }
                    onAgreeSubmit={ onAgreeSubmit }
                />
            }
            {
                agreeSubmitted && 
                <Contact 
                    user = { user } 
                    onFormSubmit={ onFormSubmit }
                />
            }
        </>
    );

    return (
        <>
        {
            isBrowser &&
            <Modal
                open={ true }
                close={ true }
                onCloseClick={ deactivatContact }
                width="890"
                title="매수 문의"
            >
                { RENDER_CONTACT() }
            </Modal>
        }
        {
            isMobile &&
            <MobileSection 
                title="매수문의" 
                onBackClick={ deactivatContact }
            >
                    { RENDER_CONTACT() }
            </MobileSection>
        }
    </>
    );
};

export default ContactContainer;