import { useState, useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import { useNavigate } from 'react-router';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Contact from '../../components/Contact/Contact';

const ContactContainer = () => {

    // 매물문의 디바이별 레이아웃 처리
    const BROWSER_DEVICE = useContext(LayoutContext) === 'browser';

    // 개인정보 활용동의 (1) 약관 받아오기
    const [ term, setTerm ] = useState('');

    // 개인정보 활용동의 (1) 활용동의 체크 (2) 활용동의 저장
    const [ agreed, setAgreed ] = useState(false);
    const [ agreeSubmitted, setAgreeSubmitted ] = useState(false);

    // 매물 문의폼 작성 (1) 접수 입력폼 (2) 접수 입력폼 검사 (3) 접수 입력폼 submit
    const [ form, setForm ] = useState({});
    const [ formFilled, setFormFilled ] = useState(false);
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // 매물 문의폼 전송
    const [ registered, setRegistered ] = useState(false);
    

    // 약관 동의 체크
    const onAgreeClick = (event) => {
        setAgreed(!agreed);
    };

    // 약관 동의 제출
    const onAgreeSubmit = (event) => {
        event.preventDefault();

        if(agreed) {
            setAgreeSubmitted(agreed);
        } else {
            alert("개인정보 수집에 동의해 주세요.");
        }
    };

    // 문의 폼 제출
    const onFormSubmit = (event) => {
        setFormSubmitted()
    };

    // 매물문의 닫기
    const navigate = useNavigate();
    const deactivatContact = () => {
        navigate('/');
    };

    return (
        <>
        {
            BROWSER_DEVICE &&  
            <Modal
                open={ true }
                close={ true }
                onCloseClick={ deactivatContact }
                width="890"
                title="매수 문의"
            >
                {
                    !agreeSubmitted && 
                    <Agreement
                        subTitle="개인정보 수집 동의"
                        label="개인정보수집에 대한 내용에 동의합니다."
                        content={ term }
                        isChecked={ agreed }
                        onAgreeClick={ onAgreeClick }
                        onAgreeSubmit={ onAgreeSubmit }
                    />
                }
                {
                    agreeSubmitted && 
                    !formSubmitted &&
                    <Contact />
                }
                {
                    formSubmitted &&
                    <div>{ "접수 완료" }</div>
                }
            </Modal>
        }
        {
            !BROWSER_DEVICE &&
            <MobileSection 
                title="매물접수" 
                onBackClick={ deactivatContact }
            >
                    {
                        !agreeSubmitted && 
                        <Agreement
                            subTitle="개인정보 수집 동의"
                            label="개인정보수집에 대한 내용에 동의합니다."
                            content={ term }
                            isChecked={ agreed }
                            onAgreeClick={ onAgreeClick }
                            onAgreeSubmit={ onAgreeSubmit }
                        />
                    }
                    {
                        agreeSubmitted && 
                        !formSubmitted &&
                        <Contact />
                    }
                    {
                        formSubmitted &&
                        <div>{ "접수 완료" }</div>
                    }
            </MobileSection>
        }
    </>
    );
};

export default ContactContainer;