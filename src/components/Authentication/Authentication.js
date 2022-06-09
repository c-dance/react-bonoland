import { Form, Time, Description } from './AuthenticationStyle';
import React from "react";
import { isMobile } from 'react-device-detect';
import { REGEXP } from '../../sheme/form';
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
    matchError
}) => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onSubmit", defaultValues: { "phone":phoneNumber } });

    return (
        <Form onSubmit={handleSubmit(onAuth? onAuthSubmit : onPhoneSubmit)}>
            <fieldset>
                <div className="wrap">
                    <input 
                        type="text" 
                        placeholder="휴대폰 번호 입력" 
                        readOnly={ onAuth }
                        {...register("phone", { required: true, pattern: REGEXP.phone })}
                    />
                    { errors.phone && <span className="warn">휴대폰 번호를 다시 확인해 주세요.</span> }
                </div>
                {
                    onAuth &&
                    <div className="wrap">
                        <input 
                            type="text" 
                            placeholder="인증 번호 입력"  
                            {...register("auth", { required: true })}
                        />
                        <Time>{ timeFormat(timer) }</Time>
                        { matchError && <span className="warn">인증번호가 일치하지 않습니다.</span> }
                    </div>
                }
            </fieldset>
            { isMobile && description && <Description>{ description }</Description> }
            <div className="action">
                <button type="submit"> { onAuth? "인증완료" : "인증번호 발송" }</button>
            </div>
        </Form>
    )
};

export default Authentication;