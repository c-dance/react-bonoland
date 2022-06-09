import React from "react";
import { Form } from './NewPasswordStyle'; 
import { useForm } from 'react-hook-form';
import { REGEXP } from "../../../sheme/form";

const NewPassword = ({
    onFormSubmit
}) => {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ mode: 'onSubmit' });

    return (
        <Form onSubmit={ handleSubmit(onFormSubmit) }>
            <fieldset>
                <div className="wrap">
                    <input 
                        type="password" 
                        name="newPwd01" 
                        placeholder="새 비밀번호"  
                        {...register("newPwd01", { required: true, pattern: REGEXP.password })}   
                    />
                    { errors.newPwd01 &&
                        <span className="warn">
                            { errors.newPwd01.type === "required" && "비밀번호를 입력해 주세요." }
                            { errors.newPwd01.type === "pattern" && "문자, 숫자를 포함한 6~12자리를 입력해주세요." }
                        </span>
                    }
                </div>
                <div className="wrap">
                    <input 
                        type="password" 
                        name="newPwd02" 
                        placeholder="새 비밀번호 확인" 
                        {...register("newPwd02", { required: true, validate: { confirm: value => value === getValues().newPwd01 }})}
                    />
                    {   errors.newPwd02 &&
                        <span className="warn">
                            { errors.newPwd02.type === "required" && "비밀번호를 확인해 주세요." }
                            { errors.newPwd02.type === "confirm" && "비밀번호가 서로 일치하지 않습니다." }
                        </span>
                    }
                </div>
            </fieldset>
            <div className="action">
                <button type="submit">비밀번호 변경</button>
            </div>
        </Form>
    )
};

export default NewPassword;