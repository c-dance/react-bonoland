import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Agreement } from './SignupFormStyle';
import { isBrowser, isMobile } from 'react-device-detect';
import { module } from '../../../themes/module';
import { REGEXP } from '../../../scheme/form';

const SignupForm = ({
    onFormSubmit
}) => {

    const { register, handleSubmit, formState: { errors }, getValues, replace, setValue } = useForm({ mode: 'onChange' });

    /* === 이용약관 동의 처리 === */
    const agreeChecked = new Array(3).fill(false);
    
    const toggleAgreeAll = (event) => {
        const agree = event.currentTarget;
        agreeChecked[agree.dataset.idx] = agree.checked;

        const checkeds = agreeChecked.filter(item => item === true);

        if(checkeds.length === agreeChecked.length) setValue("userAgree", true);
        else setValue("userAgree", false);
    };

    const handleAgreeAll = (event) => {
        const checked = event.currentTarget.checked;
        agreeChecked.forEach((item, idx) => {
            setValue(`agree${idx}`, checked);
            item = checked;
        });
    };

    const RENDER_FORM = () => (
        <Form onSubmit={ handleSubmit(onFormSubmit) }>
            <div className="desc">
                회원가입을 위해 본인정보를 기입해주세요.
            </div>
            <fieldset>
                <div className="wrap">
                    <label htmlFor="uId">아이디</label>
                    <input 
                        type="text" 
                        name="uId" 
                        id="uId" 
                        placeholder="bonoland@naver.com" 
                        className={ `bd ${ errors.userId? "invalid" : "" }` }
                        {...register("userId", { required: true, pattern: REGEXP.email })}
                    />
                    { errors.userId &&
                        <span className="warn">
                            { errors.userId.type === "required" && "아이디를 입력해 주세요." }
                            { errors.userId.type === "pattern" && "사용하시는 이메일로 아이디를 입력해 주세요." }
                        </span>
                    }
                </div>
                <div className="wrap">
                    <label htmlFor="uPwd01">비밀번호</label>
                    <input 
                        type="password" 
                        name="uPwd01" 
                        id="uPwd01" 
                        placeholder="6 ~ 12자의 문자, 숫자 조합" 
                        className={ `bd ${ errors.userPwd01? "invalid" : "" }` }
                        {...register("userPwd01", { required: true, pattern: REGEXP.password })}
                    />
                    { errors.userPwd01 &&
                        <span className="warn">
                            { errors.userPwd01.type === "required" && "비밀번호를 입력해 주세요." }
                            { errors.userPwd01.type === "pattern" && "문자, 숫자를 포함한 6~12자리를 입력해주세요." }
                        </span>
                    }
                </div>
                <div className="wrap">
                    <label htmlFor="uPwd02">비밀번호 확인</label>
                    <input 
                        type="password" 
                        name="uPwd02" 
                        id="uPwd02" 
                        className={ `bd ${ errors.userPwd02? "invalid" : "" }` }
                        {...register("userPwd02", { required: true, validate: { confirm: value => value === getValues().userPwd01 }})}
                    />
                    {   errors.userPwd02 &&
                        <span className="warn">
                            { errors.userPwd02.type === "required" && "비밀번호를 확인해 주세요." }
                            { errors.userPwd02.type === "confirm" && "비밀번호가 서로 일치하지 않습니다." }
                        </span>
                    }
                </div>
                <div className="wrap">
                    <label htmlFor="uName">이름</label>
                    <input 
                        type="text" 
                        name="uName" 
                        id="uName" 
                        className={ `bd ${ errors.userName? "invalid" : "" }` }
                        {...register("userName", { required: true })}
                    />
                    {   errors.userName &&
                        <span className="warn">
                            { errors.userName.type === "required" && "이름을 입력해 주세요." }
                        </span>
                    }
                </div>
            </fieldset>
            <hr />
            <Agreement> 
                {errors.userAgree && <span className="warn">필수 약관에 전체 동의해 주세요.</span> }
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="userAgree" 
                            name="userAgree" 
                            {...register("userAgree", { required: true })}
                            onChange={ event => handleAgreeAll(event) }
                        />
                        <label htmlFor="userAgree"></label>
                    </div>
                    <span>전체동의</span>
                </div>
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="agree0" 
                            value={false} 
                            data-idx={ 0 }
                            {...register("agree0")}
                            onChange={ event => toggleAgreeAll(event) } 
                        />
                        <label htmlFor="agree0"></label>
                    </div>
                    <Link target="_blank" to="/terms/이용약관">이용약관</Link>
                </div>
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="agree1" 
                            value={false} 
                            data-idx={ 1 }
                            {...register("agree1")}
                            onChange={ event => toggleAgreeAll(event) }  
                        />
                        <label htmlFor="agree1"></label>
                    </div>
                    <Link target="_blank" to="/terms/개인정보처리방침">개인정보처리방침</Link>
                </div>
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="agree2" 
                            value={false} 
                            data-idx={ 2 }
                            {...register("agree2")}
                            onChange={ event => toggleAgreeAll(event) }
                        />
                        <label htmlFor="agree2"></label>
                    </div>
                    <Link target="_blank" to="/terms/위치기반서비스이용동의">위치기반서비스 이용동의</Link>
                </div>
            </Agreement>
            <div className="action">
                <button type="submit">회원가입</button>
            </div>
        </Form>
    )

    return (
        <>
            {
                isBrowser &&
                RENDER_FORM()
            }
            {
                isMobile && 
                <module.scrollWrapper>
                    { RENDER_FORM() }
                </module.scrollWrapper>
            }
        </>
    )
};

export default SignupForm;