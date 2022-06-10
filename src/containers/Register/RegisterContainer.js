import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LayoutContext } from '../../hooks/layout';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Register from '../../components/Register/Register';
import { useDispatch } from 'react-redux';
import { activateAlert } from '../../store/actions/alert';

const RegisterContainer = () => {

    const dispatch = useDispatch();

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
    const [ registerSuccess, setRegistereSuccess ] = useState(false);
    
    // 매물접수 닫기
    const navigate = useNavigate();
    const deactivateRegister = () => {
        navigate('/');
    };
    
    const onAgreeSubmit = (data) => {
        console.log(data);

        setAgreeSubmitted(true);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        setRegistereSuccess(true);
    };

    useEffect(() => {
        if(registerSuccess) {
            dispatch(activateAlert({
                title:"접수 완료",
                contents: "매물 접수가 완료되었습니다. \n 입력하신 연락처 및 이메일을 통해 담당자가 회신 예정입니다. \n 감사합니다."
            }))
        }
    }, [registerSuccess])
    
    return (
        <>
            {
                !MOBILE_DEVICE && !registerSuccess &&
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
                            onAgreeSubmit={ onAgreeSubmit }
                        />
                    }
                    {
                        agreeSubmitted && 
                        <Register 
                            device="browser" 
                            onFormSubmit={ onFormSubmit }
                        />
                    }
                </Modal>
            }
            {
                MOBILE_DEVICE && !registerSuccess &&
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
                                onAgreeSubmit={ onAgreeSubmit }
                            />
                        }
                        {
                            agreeSubmitted && 
                            <Register 
                                onFormSubmit={ onFormSubmit }
                            />
                        }
                </MobileSection>
            }
        </>
    );
};

export default RegisterContainer;