import { module } from '../../../themes/module';
import { Form, Inform } from './UserAuthFormStyle';
import React from "react";

const UserAuthForm = ({ 
    password, 
    onPasswordChange,
    onFormSubmit
}) => {

    return (
        <>
            <Inform>
                본인 확인을 위해 비밀번호를 재 입력해주세요.
            </Inform>
            <Form onSubmit={ event => onFormSubmit(event) }>
                <module.Fieldset>
                    <module.Input
                        type="text"
                        value="bonoland@naver.com"
                        disabled
                    />
                    <module.Input
                        type="password"
                        value={ password }
                        onChange= { event => onPasswordChange(event) }
                        placeholder="비밀번호"
                    />
                </module.Fieldset>
                <module.SubmitButton
                    type="submit"
                    className={ password.length <= 0 && "disabled"}
                >
                    확인
                </module.SubmitButton>
            </Form>
        </>
    )
}

export default UserAuthForm;