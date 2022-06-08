import { Form, Time, Description } from './AuthenticationStyle';
import React from "react";
import { isMobile } from 'react-device-detect';

const Authentication = ({
    phoneNumber,
    onPhoneChange,
    onPhoneSubmit,
    onAuth,
    timer,
    authNumber,
    onAuthChange,
    onAuthSubmit, 
    description
}) => {
    console.log(description);
    return (
        <Form onSubmit={ event => {
            onAuth? onAuthSubmit(event) : onPhoneSubmit(event)
        }}>
            <fieldset>
                <div className="wrap">
                    <input 
                        type="text" 
                        placeholder="휴대폰 번호 입력" 
                        value={ phoneNumber }   
                        onChange={ event => onPhoneChange(event.currentTarget.value) }
                    />
                    <span className="warn">휴대폰 번호를 다시 확인해 주세요.</span>
                </div>
                {
                    onAuth &&
                    <div className="wrap">
                        <input 
                            type="text" 
                            placeholder="인증 번호 입력"  
                            value={ authNumber }  
                            onChange={ event => onAuthChange(event.currentTarget.value) }
                        />
                        <Time>{ timer }</Time>
                    </div>
                }
            </fieldset>
            { isMobile && description && <Description>{ description }</Description> }
            <div className="action">
                <button 
                    type="submit"
                >
                {
                    onAuth? "인증완료" : "인증번호 발송"
                }
                </button>
            </div>
        </Form>
    )
};

export default Authentication;