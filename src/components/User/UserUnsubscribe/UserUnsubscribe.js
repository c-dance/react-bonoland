import React from "react";
import { Unsubscribe } from "./UserUnsubscribeStyle";

const UserUnsubecribe = ({
    onFormSubmit
}) => {
    return (
        <Unsubscribe onSubmit={ event => onFormSubmit(event)}>
            <p>
                보노랜드 탈퇴 시 해당 계정을 통해 수집된 모든 개인정보 및 활동 정보는 모두 삭제됩니다.
                <br />
                <em>계정 삭제 후 7일간 동일 휴대폰 인증 재 가입이 불가</em>합니다.
            </p>
            <div>
                <input
                    type="checkbox"
                    name="unsubsAgree"
                    id="unsubsAgree"
                />
                <label htmlFor="unsubsAgree">계정 탈퇴에 동의합니다.</label>
            </div>
        </Unsubscribe>
    )
};

export default UserUnsubecribe;