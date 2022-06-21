import React, { useState } from "react";
import { Unsubscribe } from "./UserUnsubscribeStyle";
import { module } from "../../../themes/module";

const UserUnsubecribe = ({
    onFormSubmit
}) => {

    const [ agreement, setAgreement ] = useState(null);
    
    const handleSubmit = event => {
        event.preventDefault();
        if(agreement !== true) setAgreement(false);
        else onFormSubmit({ agreement: agreement});
    }

    return (
        <Unsubscribe onSubmit={ event => handleSubmit(event) }>
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
                    onChange={ event => setAgreement(event.currentTarget.checked) }
                />
                <label htmlFor="unsubsAgree">계정 탈퇴에 동의합니다.</label>
                { agreement === false && <span className="warn">탈퇴 약관에 동의해 주세요.</span> }
            </div>
            <module.SubmitButton
                className={ agreement === true? "" : "disabled" }
            >확인</module.SubmitButton>
        </Unsubscribe>
    )
};

export default UserUnsubecribe;