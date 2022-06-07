import React from "react";
import { Success } from "./FindPwdSuccessStyle";
import { useDispatch } from "react-redux";
import { activateLogin } from "../../../store/actions/mode";

const FindPwdSuccess = () => {
    
    const dispatch = useDispatch();

    return (
        <Success>
            <h3>비밀번호 변경 완료</h3>
            <p>새로운 비밀번호로 변경이 완료되었습니다.</p>
            <div className="action">
                <button onClick={ () => dispatch(activateLogin()) }>로그인</button>
            </div>
        </Success>
    )
};

export default FindPwdSuccess;