import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';
import SignupType from "../../components/Account/SignupType/SignupType";
import AuthenticationContaienr from '../Authentifiction/AuthentificationContainer';
import SignupForm from "../../components/Account/SignupForm/SignupForm";
import SignupSuccess from '../../components/Account/SignupSuccess/SignupSuccess';
import Modal from "../../components/Modal/Modal";
import { deactivateSignup } from '../../store/actions/mode';

const SignupContaienr = () => {

    const dispatch = useDispatch();

    // type 입력
    const [ type, setType ] = useState('');
    const [ typeSumitted, setTypeSubmitted ] = useState(false);

    // 인증
    const [ auth, setAuth ] = useState('');

    // 회원가입 입력폼
    const [ form , setForm ] = useState({});
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // type 값 입력
    const onTypeChange = (event) => {
        setType(event.currentTarget.value);
    };
    
    // type 폼 제출
    const onTypeSubmit = (event) => {
        event.preventDefault();
        if(type.length > 0) setTypeSubmitted(true);
        else alert('매도/매수중 하나를 선택해주세요.');
    };


    // 회원가입 폼 제출
    const onFormSubmit = (event) => {
        event.preventDefault();
        // 입력폼 유효성 검사
        setFormSubmitted(true);
        console.log(formSubmitted);
    };

    const handleAuth = (result) => {
        setAuth(result);
    };

    // 회원가입 닫기
    const deactiveSignup = () => {
        dispatch(deactivateSignup());
        setType('');
        setTypeSubmitted(false);
        setFormSubmitted(false);
    };

    const modalProps = {
        open: true ,
        close: true,
        onCloseClick: deactiveSignup,
        width: "360",
        title: "회원가입"
    };

    const alertProps = Object.assign(modalProps, { title: "회원가입 완료!" });

    const typeProps = {
        type: type,
        onTypeChange: onTypeChange,
        onTypeSubmit: onTypeSubmit
    };

    return (
        <>
            <BrowserView>
                {
                    !typeSumitted &&
                    <Modal {...modalProps}>
                        <SignupType {...typeProps}/>
                    </Modal>
                }
                {
                    typeSumitted && !auth &&
                    <Modal {...modalProps}>
                        <AuthenticationContaienr handleAuth={ handleAuth } />
                    </Modal>
                }
                {
                    !formSubmitted && auth &&
                    <Modal {...modalProps}>
                        <SignupForm
                            onFormSubmit={ onFormSubmit }
                        />
                    </Modal>
                }
                {
                    formSubmitted &&
                    <Modal {...alertProps}>
                        <SignupSuccess />
                    </Modal>
                }
            </BrowserView>

        </>
    )
};

export default SignupContaienr;