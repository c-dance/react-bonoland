import { Form, FindId } from './FindIdSuccessStyle';
import React from "react";
import { useDispatch } from 'react-redux';
import { activateLogin } from '../../../store/actions/mode';
import { USER_ID } from '../../../utils/user';

const FindIdSuccess = ({ data, onLoginClick }) => { 

    const dispatch = useDispatch();

    const openLogin = (id) => {
        USER_ID.store(id);
        dispatch(activateLogin());
    }

    return (
        <Form>
            <FindId>
                <span>가입하신 회원님의 아이디는</span>
                <strong>{ data }</strong>
                <span>입니다.</span>
            </FindId>
            <div className="action">
                <button
                    onClick={ () => openLogin(data) }
                >
                    로그인
                </button>
            </div>
        </Form>
    )
}

export default FindIdSuccess;