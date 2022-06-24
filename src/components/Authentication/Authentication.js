import { Form, Time, Description } from './AuthenticationStyle';
import React, { useEffect } from "react";
import { isMobile } from 'react-device-detect';
import { REGEXP } from '../../scheme/form';
import { useForm } from 'react-hook-form';

const timeFormat = seconds => {
    const second = parseInt(seconds%60).toString();
    const minute = parseInt(seconds/60).toString();
    return `${minute.toString()}:${second < 10 ? '0' + second : second}`;
};

const Authentication = ({
    phoneNumber,
    onPhoneSubmit,
    onAuth,
    timer,
    onAuthSubmit, 
    description,
    authNumberError
}) => {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({ 
        mode: "onChange", 
        reValidateMode: "onChange", 
        defaultValues: { 
            "phoneNumber": phoneNumber, 
        } 
    });

    const phoneWatching = watch("phoneNumber");

    useEffect(() => {
        setValue("authNumber", "");
    }, [onAuth]);

    return (
        <Form onSubmit={handleSubmit(onAuth? onAuthSubmit : onPhoneSubmit)}>
            <fieldset>
                <div className="wrap">
                    <input 
                        type="text" 
                        placeholder="휴대폰 번호 입력" 
                        readOnly={ onAuth }
                        {...register("phoneNumber", { required: true, pattern: REGEXP.phone })}
                    />
                    { errors.phoneNumber && <span className="warn">휴대폰 번호를 다시 확인해 주세요.</span> }
                </div>
                {
                    onAuth &&
                    <div className="wrap">
                        <input 
                            type="text" 
                            placeholder="인증 번호 입력"  
                            {...register("authNumber", { required: true })}
                        />
                        <Time>{ timeFormat(timer) }</Time>
                        { authNumberError.length > 0 && <span className="warn">{ authNumberError }</span> }
                    </div>
                }
            </fieldset>
            { isMobile && description && <Description>{ description }</Description> }
            <div className="action">
                <button 
                    type="submit"
                    className={ REGEXP.phone.test(phoneWatching)? "" : "disabled"  }
                > { onAuth? "인증완료" : "인증번호 발송" }</button>
            </div>
        </Form>
    )
};

export default Authentication;