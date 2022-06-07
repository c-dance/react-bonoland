import { Form } from './SignupSuccessStyle';
import React from "react";
import { useDispatch } from 'react-redux';
import { activateLogin } from '../../../store/actions/mode';
import { USER } from '../../../utils/user';

const SignupSuccess = () => {

    const dispatch = useDispatch();

    const openLogin = () => {
        USER.removeId();
        dispatch(activateLogin());
    };

    return (
        <Form>
            <div className="desc">
                보노랜드 회원가입이 완료되었습니다!
                <br />
                로그인 후 더 많은 서비스를 이용해보세요!
            </div>
            <div className="action">
                <button onClick={ () => openLogin() }>
                    로그인
                </button>
            </div>
        </Form>
    )
}

export default SignupSuccess;