import { module } from '../../../themes/module';
import { Form, Inform } from './UserAuthFormStyle';

const UserAuthForm = () => {
    return (
        <>
            <Inform>
                본인 확인을 위해 비밀번호를 재 입력해주세요.
            </Inform>
            <Form>
                <module.Fieldset>
                    <module.Input
                        type="text"
                        value="bonoland@naver.com"
                        disabled
                    />
                    <module.Input
                        type="password"
                        placeholder="비밀번호"
                        disabled
                    />
                </module.Fieldset>
                <module.SubmitButton
                    className="disabled"
                >
                    확인
                </module.SubmitButton>
            </Form>
        </>
    )
}

export default UserAuthForm;