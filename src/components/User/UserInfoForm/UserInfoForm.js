import React from "react";
import { module } from '../../../themes/module';
import { Form, InputWrap, Unsubscribe } from "./UserInfoFormStyle";

const UserInfoForm = ({
    newPwd01,
    newPwd02,
    memo,
    onNewPwd01Change,
    onNewPwd02Change,
    onMemoChange,
    onUnsubsClick,
    onNewPhoneClick
}) => {
    return (
        <module.scrollWrapper>
            <Form>
                <module.Fieldset>
                    <InputWrap>
                        <label>분류</label>
                        <module.Input
                            type="text"
                            value="매도 희망인"
                            disabled
                        />
                    </InputWrap>
                    <InputWrap>
                        <label>이름</label>
                        <module.Input
                            type="text"
                            value="아이덴잇"
                            disabled
                        />
                    </InputWrap>
                    <InputWrap>
                        <label>아이디</label>
                        <module.Input
                            type="text"
                            value="bonoland@naver.com"
                            disabled
                        />
                    </InputWrap>
                    <InputWrap>
                        <label>연락처</label>
                        <module.Input
                            type="text"
                            value="010-0000-0000"
                            disabled
                        />
                        <button type="button" onClick={ (event) => onNewPhoneClick(event) }>변경</button>
                    </InputWrap>
                    <hr />
                    <InputWrap className="cols">
                        <label>새 비밀번호</label>
                        <module.Input
                            border={ true }
                            type="password"
                            value={ newPwd01 }
                            onChange= { event => onNewPwd01Change(event) }
                            placeholder="문자, 숫자로 조합된 6~12자리 숫자"
                        />
                    </InputWrap>
                    <InputWrap className="cols">
                        <label>새 비밀번호 확인</label>
                        <module.Input
                            border={ true }
                            type="password"
                            value={ newPwd02 }
                            onChange= { event => onNewPwd02Change(event) }
                            placeholder="새 비밀번호 확인"
                        />
                    </InputWrap>
                    <hr />
                    <InputWrap className="cols">
                        <label>비고</label>
                        <module.Textarea
                            value={ memo }
                            onChange= { event => onMemoChange(event) }
                        />
                    </InputWrap>
                </module.Fieldset>
            </Form> 
            <Unsubscribe>
                <button onClick={ () => onUnsubsClick() }>회원탈퇴</button>
            </Unsubscribe>
        </module.scrollWrapper>
    )
};

export default UserInfoForm;