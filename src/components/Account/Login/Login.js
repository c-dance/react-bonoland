import React, { useEffect, useState } from "react";
import { Form, Metas, Signup } from './LoginStyle';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { activateFindId, activateFindPwd, activateSignup } from '../../../store/actions/mode';
import { isBrowser, isMobile } from 'react-device-detect';
import { REGEXP } from '../../../scheme/form';
import { getValue } from "@testing-library/user-event/dist/utils";


const Login = ({
    id,
    storeId,
    onStoreIdChange,
    onFormSubmit,
    message
}) => {

    const dispatch = useDispatch();
    const [ failMsg, setFailMsg ] = useState(message);
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({ 
        mode: 'onSubmit', 
        reValidateMode: 'onSubmit',
        defaultValues: { "userId" : id, "userStoreId" :  storeId } 
    });
    const pwdWatching = watch("userPwd");
    const storeIdWatching = watch("userStoreId");

    useEffect(() => {
        onStoreIdChange(storeIdWatching, getValues("userId"));
    }, [storeIdWatching])
 

    useEffect(() => {
        setFailMsg(message);
    }, [message]);

    useEffect(() => {
        setFailMsg("");
    }, [pwdWatching])

    return (
        <Form onSubmit={ handleSubmit(onFormSubmit) }>
            <fieldset>
                <div className="wrap">
                    <label htmlFor="userId">아이디</label>
                    <input 
                        name="userId"
                        id="userId"
                        type="text" 
                        className={ isMobile? "bd" : "" } 
                        placeholder="아이디"  
                        {...register("userId", { required: true, pattern: REGEXP.email })}
                    />
                    {   errors.userId &&
                        <span className="warn">
                            { errors.userId.type === "required" && "아이디를 입력해 주세요." }
                            { errors.userId.type === "pattern" && "아이디는 이메일 형식으로 입력해 주세요." }
                        </span>
                    }
                </div>
                <div className="wrap">
                    <label htmlFor="userPwd">비밀번호</label>
                    <input 
                        name="userPwd"
                        id="userPwd"
                        type="password" 
                        className={ isMobile? "bd" : "" } 
                        placeholder="비밀번호"
                        {...register("userPwd", { required: true })}
                    />
                    { errors.userPwd && <span className="warn">비밀번호를 입력해 주세요</span> }
                    { failMsg.length > 0 && <span className="warn">{ failMsg }</span> }
                </div>
            </fieldset>
            <Metas>
                <div className="store">
                    <input 
                        type="checkbox" 
                        id="userStoreId" 
                        name="uerStoreId" 
                        {...register("userStoreId") }
                        />
                    <label htmlFor="userStoreId">아이디 저장</label>
                </div>
                <div className="finds">
                    <button type="button" onClick={ () => {dispatch(activateFindId())}  }>아이디 찾기</button>
                    <button type="button" onClick={ () => {dispatch(activateFindPwd())}  }>비밀번호 찾기</button>
                </div>
            </Metas>
            <div className="action">
                <button type="submit">로그인</button>
            </div>
            <Signup>
                <span>아직 회원이 아니신가요?</span>
                <button type="button" onClick={ () => {dispatch(activateSignup())} }>회원가입</button>
            </Signup>
        </Form>
    )
};

export default Login;