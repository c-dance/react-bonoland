import { Form, FindId } from './FindIdSuccessStyle';

const FindIdSuccess = ({ data, onLoginClick }) => (
    <Form>
        <FindId>
            <span>가입하신 회원님의 아이디</span>
            <strong>{ data }</strong>
        </FindId>
        <div className="action">
            <button
                onClick={ onLoginClick }
            >
                로그인
            </button>
        </div>
    </Form>
);

export default FindIdSuccess;