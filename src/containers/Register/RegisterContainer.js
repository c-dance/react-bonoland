import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { LayoutContext } from '../../hooks/layout';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Register from '../../components/Register/Register';

const RegisterContainer = () => {

    // 매물접수 디바이스별 레이아웃 처리
    const MOBILE_DEVICE = useContext(LayoutContext) === 'mobile';

    // 개인정보 활용동의 (1) 약관 받아오기
    const [ term, setTerm ] = useState('');

    // 개인정보 활용동의 (1) 활용동의 체크 (2) 활용동의 저장
    const [ agreed, setAgreed ] = useState(false);
    const [ agreeSubmitted, setAgreeSubmitted ] = useState(false);

    // 매물 접수폼 작성 (1) 접수 입력폼 (2) 접수 입력폼 검사 (3) 접수 입력폼 submit
    const [ form, setForm ] = useState({});
    const [ formFilled, setFormFilled ] = useState(false);
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // 매물 접수폼 전송
    const [ registered, setRegistered ] = useState(false);
    
    // 매물접수 닫기
    const navigate = useNavigate();
    const deactivateRegister = () => {
        navigate('/');
    }


    const onAgreeClick = (event) => {
        setAgreed(!agreed);
    };

    const onAgreeSubmit = (event) => {
        event.preventDefault();

        if(agreed) {
            setAgreeSubmitted(agreed);
        } else {
            alert("개인정보 수집에 동의해 주세요.");
        }
    };

    const onFormSubmit = (event) => {
        setFormSubmitted()
    };
    
    return (
        <>
            {
                !MOBILE_DEVICE &&
                <Modal
                        open={ true }
                        close={ true }
                        onCloseClick={ deactivateRegister }
                        width="890"
                        title="매물 접수"
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
                        <Register device="browser" />
                    }
                    {
                        formSubmitted && 
                        <div>{ "접수 완료" }</div>   
                    }
                </Modal>
            }
            {
                MOBILE_DEVICE &&
                <MobileSection 
                        title="매물접수"
                        onBackClick={ deactivateRegister }
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
                            <Register />
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

export default RegisterContainer;