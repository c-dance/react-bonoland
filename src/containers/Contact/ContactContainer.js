import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import Agreement from "../../components/Agreement/Agreement";
import Contact from '../../components/Contact/Contact';

const ContactContainer = () => {

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
            <BrowserView>
                <Modal
                    open={ true }
                    close={ true }
                    width="890"
                    title="매수 문의"
                >
                    {
                        !agreeSubmitted && <Agreement
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
            </BrowserView>
            <MobileView>
                <MobileSection title="매물접수" >
                    {
                        !agreeSubmitted && <Agreement
                            subTitle="개인정보 수집 동의"
                            label="개인정보수집에 대한 내용에 동의합니다."
                            content={ term }
                            isChecked={ agreed }
                            onAgreeClick={ onAgreeClick }
                            onAgreeSubmit={ onAgreeSubmit }
                            device="mobile"
                        />
                    }
                    {
                        agreeSubmitted && 
                        !formSubmitted &&
                        <Contact device="mobile" />
                    }
                    {
                        formSubmitted &&
                        <div>{ "접수 완료" }</div>
                    }
                </MobileSection>
            </MobileView>
            
        </>
        )
};

export default ContactContainer;