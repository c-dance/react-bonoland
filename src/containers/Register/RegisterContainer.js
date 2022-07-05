import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Register from '../../components/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { activateAlert } from '../../store/actions/alert';
import { registerCenter } from '../../api/service';
import { isBrowser, isMobile } from 'react-device-detect';
import { USER_AUTH } from '../../utils/user';
import { deactivateRegister } from '../../store/actions/service';
import { useGet } from '../../hooks/index';
import { getPrivacyTerm } from '../../api/terms';

const RegisterContainer = () => {

    const dispatch = useDispatch();
    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    // 개인정보 활용동의 (1) 약관 받아오기
    const [ term, setTerm ] = useState('');
    const [ loading, error, data, setGet ] = useGet('');

    // 개인정보 활용동의 (1) 활용동의 체크 (2) 활용동의 저장
    const [ agreeSubmitted, setAgreeSubmitted ] = useState(false);

    // 로그인 되었을 때
    const [ user, setUser ] = useState({ uName: "", uEmail: "", uTel: "" });

    
    
    // 매물접수 닫기
    const navigate = useNavigate();
    const onCloseClick = () => { dispatch(deactivateRegister()) };
    
    const onAgreeSubmit = data => setAgreeSubmitted(data.agree);

    const onFormSubmit = async data => {
        const RESPONSE = await registerCenter(data);

        if(RESPONSE) {
            deactivateRegister();
            dispatch(activateAlert({
                title:"매물 접수",
                contents: RESPONSE.data.message || "매물 접수가 완료되었습니다."
            }));
        } else {
            dispatch(activateAlert({
                title:"매물 접수 오류",
                contents: "매물 접수 중 오류가 발생했습니다."
            }))
        }
    };

    const RENDER_REGISTER = () => (
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
                <Register 
                    device={ isBrowser? "browser" : "mobile" } 
                    user={ user }
                    onFormSubmit={ onFormSubmit }
                />
            }
        </>
    );

    useEffect(() => {
        if(IS_LOGGEDIN) {
            const USER = USER_AUTH.get();
            setUser({
                uEmail: USER.id,
                uName: USER.name,
                uTel: USER.tel, 
            });
        }
        setGet(getPrivacyTerm());
    }, []);

    useEffect(() => {
        if(data) setTerm(data.result.siteContents);
    }, [data]);
    
    return (
        <>
            {
                isBrowser &&
                <Modal
                        open={ true }
                        close={ true }
                        onCloseClick={ onCloseClick }
                        width="890"
                        title="매물 접수"
                    >
                    { RENDER_REGISTER() }
                </Modal>
            }
            {
                isMobile &&
                <MobileSection 
                        title="매물접수"
                        onBackClick={ onCloseClick }
                    >
                    { RENDER_REGISTER() }
                </MobileSection>
            }
        </>
    );
};

export default RegisterContainer;