import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { LayoutContext } from '../../hooks/layout';
import SignUpType from "../../components/Account/SignUpType/SignUpType";
import Authentication from '../../components/Authentication/Authentication';
import SignUpForm from "../../components/Account/SignUpForm/SignUpForm";
import Alert from "../../components/ui/Alert/Alert";
import Modal from "../../components/Modal/Modal";

const SignUpContaienr = ({
    active,
    toggleActive
}) => {

    const BROWSER_DEVICE = useContext(LayoutContext) === "browser";


    // type 입력
    const [ type, setType ] = useState('');
    const [ typeSumitted, setTypeSubmitted ] = useState(false);

    // 전화번호 입력
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ phoneSubmitted, setPhoneSubmitted ] = useState(false);

    // 인증번호 입력
    const [ authCount, setAuthCount ] = useState(0);
    const [ authNumber, setAuthNumber ] = useState('');
    const [ authPassed, setAuthPassed ] = useState(false);

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

    // 전화번호 폼 제출
    const onPhoneSubmit = (event) => {
        event.preventDefault();
        // 전화번호 유효성 검증
        setPhoneSubmitted(true);
        setAuthCount(100);
    }; 

    // 인증번호 폼 제출
    const onAuthSubmit = (event) => {
        event.preventDefault();
        // 인증번호 받아오기 fetch
        const authPassword = '01234';

        if(authCount <= 0) {
            alert('인증 시간이 경과하였습니다. 다시 시도해 주세요.');
            setAuthNumber('');
            setAuthCount(0);
            setPhoneSubmitted(false);
            return;
        }

        if(authNumber === authPassword) {setAuthPassed(true);}
        else alert('인증번호가 맞지 않습니다.')
    };

    // 회원가입 폼 제출
    const onFormSubmit = (event) => {
        event.preventDefault();
        // 입력폼 유효성 검사
        setFormSubmitted(true);
    };

    const navigate = useNavigate();
    const deactiveSignUp = () => {
        // toggleActive();
        navigate(0);
    };

    return (
        <>
            {
                BROWSER_DEVICE && 
                <Modal
                    open={ active }
                    close={ true }
                    onCloseClick={ deactiveSignUp }
                    width="360"
                    height="434"
                    title="회원가입"
                >
                {
                    !typeSumitted &&
                    <SignUpType
                        type = { type }
                        onTypeChange = { onTypeChange }
                        onTypeSubmit = { onTypeSubmit }
                    />
                }
                {
                    typeSumitted && !authPassed &&
                    <Authentication
                        phoneNumber={ phoneNumber }
                        onPhoneChange= { setPhoneNumber }
                        onPhoneSubmit={ onPhoneSubmit }
                        onAuth={ phoneSubmitted }
                        authCount={ authCount }
                        authNumber={ authNumber }
                        onAuthChange={ setAuthNumber }
                        onAuthSubmit={ onAuthSubmit }
                    />
                }
                {
                    authPassed &&
                    <SignUpForm
                        phoneNumber={ phoneNumber }
                        onFormSubmit={ onFormSubmit }
                    />
                }
                </Modal>
            }
        </>
    )
};

export default SignUpContaienr;