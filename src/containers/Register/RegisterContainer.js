import { useState } from 'react';
import Agreement from "../../components/Agreement/Agreement";
import Modal from '../../components/Modal/Modal';
import Register from '../../components/Register/Register';

const RegisterContainer = () => {

    // agreement
    const [ agreed, setAgreed ] = useState(false);
    const [ agreeSubmitted, setAgreeSubmitted ] = useState(false);
    const [ term, setTerm ] = useState('');
    // form
    const [ form, setForm ] = useState({});
    const [ formFilled, setFormFilled ] = useState(false);
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    // send form
    const [ registered, setRegistered ] = useState(false);
    

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
                !agreeSubmitted && 
                <Modal
                    open={ !agreeSubmitted }
                    close={ true }
                    width="890"
                    title="매물 접수"
                >
                    <Agreement
                        subTitle="개인정보 수집 동의"
                        label="개인정보수집에 대한 내용에 동의합니다."
                        content={ term }
                        isChecked={ agreed }
                        onAgreeClick={ onAgreeClick }
                        onAgreeSubmit={ onAgreeSubmit }
                    />
                </Modal>
            }
            {
                agreeSubmitted && 
                !formSubmitted && <Modal
                    open={ agreeSubmitted }
                    close={ true }
                    width="890"
                    title="매물접수"
                >
                    <Register />
                </Modal>

            }
            {
                formSubmitted && <Modal
                    open={ formSubmitted }
                    width="380px"
                    title="접수완료"
                >
                <div>{ "접수 완료" }</div>   
                </Modal>
            }
        </>
        )
};

export default RegisterContainer;