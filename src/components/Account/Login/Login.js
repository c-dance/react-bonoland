import { Form, Metas, Signup } from './LoginStyle';
import { useDispatch } from 'react-redux';
import { activateFindId, activateFindPwd, activateSignup } from '../../../store/actions/mode';
import React from "react";


const Login = ({
    id,
    onIdChange,
    pwd,
    onPwdChange,
    storeId,
    onStoreIdChange,
    onFormSubmit,
}) => {

    const dispatch = useDispatch();

    return (
        <Form onSubmit={ event => onFormSubmit(event) }>
            <fieldset>
                <div className="wrap">
                    <input type="text" value={ id } onChange={ event => onIdChange(event) } placeholder="아이디"  />
                </div>
                <div className="wrap">
                    <input type="password" value={ pwd } onChange={ event => onPwdChange(event) } placeholder="비밀번호" />
                </div>
            </fieldset>
            <Metas>
                <div className="save">
                    <input type="checkbox" id="uStoreId" name="uStoreId" onChange={ event => onStoreIdChange(event) } checked={ storeId }/>
                    <label htmlFor="uStoreId">아이디 저장</label>
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