import React from "react";
import { module } from '../../../themes/module';
import { Form, InputWrap, Unsubscribe } from "./UserInfoFormStyle";
import { useForm } from 'react-hook-form';
import { REGEXP } from "../../../sheme/form";

const UserInfoForm = ({
    user,
    onUnsubsClick,
    onNewPhoneClick, 
    onFormSubmit
}) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ mode: 'onChange' });

    console.log(user.tel);

    return (
        <module.scrollWrapper>
            <Form onSubmit={ handleSubmit(onFormSubmit) }>
                <module.Fieldset>
                    <InputWrap>
                        <label>분류</label>
                        <module.Input
                            type="text"
                            value={ user.type }
                            readOnly
                        />
                    </InputWrap>
                    <InputWrap>
                        <label>이름</label>
                        <module.Input
                            type="text"
                            value={ user.name }
                            readOnly
                        />
                    </InputWrap>
                    <InputWrap>
                        <label>아이디</label>
                        <module.Input
                            type="text"
                            value={ user.id }
                            readOnly
                        />
                    </InputWrap>
                    <InputWrap>
                        <label>연락처</label>
                        <module.Input
                            type="text"
                            value={ user.tel }
                            readOnly
                        />
                        <button type="button" onClick={ (event) => onNewPhoneClick(event) }>변경</button>
                    </InputWrap>
                    <hr />
                    <InputWrap className="cols">
                        <label>새 비밀번호</label>
                        <module.Input
                            className={ `bd ${ errors.newPwd01? "invalid" : "" }` }
                            type="password" 
                            name="newPwd01" 
                            placeholder="새 비밀번호"  
                            {...register("newPwd01", { pattern: REGEXP.password })}   
                        />
                        { errors.newPwd01 &&
                            <span className="warn">
                                { errors.newPwd01.type === "required" && "비밀번호를 입력해 주세요." }
                                { errors.newPwd01.type === "pattern" && "문자, 숫자를 포함한 6~12자리를 입력해주세요." }
                            </span>
                        }
                    </InputWrap>
                    <InputWrap className="cols">
                        <label>새 비밀번호 확인</label>
                        <module.Input
                            className={ `bd ${ errors.newPwd02? "invalid" : "" }` }
                            type="password" 
                            name="newPwd02" 
                            placeholder="새 비밀번호 확인" 
                            {...register("newPwd02", { 
                                required: getValues().newPwd01, 
                                validate: { confirm: value => value === getValues().newPwd01 }})
                            }
                        />
                        {   errors.newPwd02 &&
                            <span className="warn">
                                { errors.newPwd02.type === "required" && "비밀번호를 확인해 주세요." }
                                { errors.newPwd02.type === "confirm" && "비밀번호가 서로 일치하지 않습니다." }
                            </span>
                        }
                    </InputWrap>
                    <hr />
                    <InputWrap className="cols">
                        <label>비고</label>
                        <module.Textarea
                            {...register("userMemo")}
                        >
                        { user.memo }
                        </module.Textarea>
                    </InputWrap>
                </module.Fieldset>
                <module.SubmitButton>적용</module.SubmitButton>
            </Form> 
            <Unsubscribe>
                <button onClick={ () => onUnsubsClick() }>회원탈퇴</button>
            </Unsubscribe>
        </module.scrollWrapper>
    )
};

export default UserInfoForm;