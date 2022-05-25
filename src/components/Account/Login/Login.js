import { Form, Metas, SignUp } from './LoginStyle';

const Login = ({
    id,
    onIdChange,
    pwd,
    onPwdChange,
    saveId,
    onSaveIdChange,
    onFormSubmit
}) => {
    return (
        <Form onSubmit={ event => onFormSubmit(event) }>
            <fieldset>
                <div className="wrap">
                    <input type="text" value={ id } onChange={ event => onIdChange(event) } placeholder="아이디"  />
                </div>
                <div className="wrap">
                    <input type="password" value={ pwd } onChange={ event => onPwdChange(event) } placeholder="비밀번호" />
                </div>
            </fieldset>
            <Metas>
                <div className="save">
                    <input type="checkbox" id="uSaveId" name="uSaveId" onChange={ event => onSaveIdChange(event) } checked={ saveId }/>
                    <label htmlFor="uSaveId">아이디 저장</label>
                </div>
                <div className="finds">
                    <button>아이디 찾기</button>
                    <button>비밀번호 찾기</button>
                </div>
            </Metas>
            <div className="action">
                <button type="submit">로그인</button>
            </div>
            <SignUp>
                <span>아직 회원이 아니신가요?</span>
                <button>회원가입</button>
            </SignUp>
        </Form>
    )
};

export default Login;