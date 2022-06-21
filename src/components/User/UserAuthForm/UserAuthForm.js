import React from "react";
import { module } from '../../../themes/module';
import { Form, Inform } from './UserAuthFormStyle';
import { useForm } from "react-hook-form";


const UserAuthForm = ({ 
    id,
    onFormSubmit, 
    onNewPwdClick
}) => {    

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ mode: 'onSubmit', defaultValues: { "id" : id } });


    return (
        <>
            <Inform>
                본인 확인을 위해 비밀번호를 재 입력해주세요.
            </Inform>
            <Form onSubmit={ handleSubmit(onFormSubmit) }>
                <module.Fieldset>
                    <module.Input
                        type="text"
                        value={ id }
                        disabled
                        {...register("id", { required: true })}
                    />
                    <module.Input
                        type="password"
                        placeholder="비밀번호"
                        {...register("password", { required: true })}
                    />
                        { errors.password && <span className="warn">비밀번호를 입력해 주세요.</span> }
                </module.Fieldset>
                <span className="newPwd" onClick={ () => onNewPwdClick() }>비밀번호를 잊어버리셨나요?</span>
                <module.SubmitButton
                    type="submit"
                    className={ getValues("password") && "disabled"}
                >
                    확인
                </module.SubmitButton>
            </Form>
        </>
    )
}

export default UserAuthForm;