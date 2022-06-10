import React, { useState, useContext, useEffect } from 'react';
import { LayoutContext } from '../../hooks/layout';
import { useNavigate } from 'react-router';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Contact from '../../components/Contact/Contact';
import { isBrowser, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { activateAlert } from '../../store/actions/alert';

const ContactContainer = () => {

    const dispatch = useDispatch();

    // 개인정보 활용동의 (1) 약관 받아오기
    const [ term, setTerm ] = useState('');

    // 개인정보 활용동의 (1) 활용동의 체크 (2) 활용동의 저장
    const [ agreed, setAgreed ] = useState(false);
    const [ agreeSubmitted, setAgreeSubmitted ] = useState(false);

    // 매수 문의폼 작성 (1) 접수 입력폼 (2) 접수 입력폼 검사 (3) 접수 입력폼 submit
    const [ form, setForm ] = useState({});
    const [ formFilled, setFormFilled ] = useState(false);
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // 로그인 되었을 때
    const [ user, setUser ] = useState(null);

    // 매수 문의폼 전송
    const [ contactSuccess, setContactSuccess ] = useState(false);
    

    // 약관 동의 제출
    const onAgreeSubmit = data => {
        console.log(data);

        setAgreeSubmitted(true);
    };

    // 문의 폼 제출
    const onFormSubmit = data => {
        console.log(data);
        setContactSuccess(true);
    };

    // 매수문의 닫기
    const navigate = useNavigate();
    const deactivatContact = () => {
        navigate('/');
    };

    useEffect(() => {
        if(contactSuccess) {
            dispatch(activateAlert({
                title:"문의 완료",
                contents: "매수 문의가 완료되었습니다. \n 입력하신 연락처 및 이메일을 통해 담당자가 회신 예정입니다. \n 감사합니다."
            }))
        }
    }, [contactSuccess]);

    const template = () => (
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
                !contactSuccess &&
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
            isBrowser && !contactSuccess &&
            <Modal
                open={ true }
                close={ true }
                onCloseClick={ deactivatContact }
                width="890"
                title="매수 문의"
            >
                { template() }
            </Modal>
        }
        {
            isMobile && !contactSuccess &&
            <MobileSection 
                title="매수문의" 
                onBackClick={ deactivatContact }
            >
                    { template() }
            </MobileSection>
        }
    </>
    );
};

export default ContactContainer;