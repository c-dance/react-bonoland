import { Form } from './NewPasswordStyle'; 

const NewPassword = ({
    onFormSubmit
}) => {
    return (
        <Form onSubmit={ event => onFormSubmit(event) }>
            <fieldset>
                <div className="wrap">
                    <input type="text" name="newPwd01" placeholder="새 비밀번호" />
                </div>
                <div className="wrap">
                    <input type="text" name="newPwd02" placeholder="새 비밀번호 확인" />
                </div>
            </fieldset>
            <div className="action">
                <button type="submit">비밀번호 변경</button>
            </div>
        </Form>
    )
};

export default NewPassword;