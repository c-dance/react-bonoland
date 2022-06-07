import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Agreement } from './SignupFormStyle';
import { isBrowser, isMobile } from 'react-device-detect';
import { module } from '../../../themes/module';

const SignupForm = ({
    onFormSubmit
}) => {

    const [ agrees, setAgrees ] = useState([false, false, false]);
    const [ agreeAll, setAgreeAll ] = useState(false);

    const toggleAgrees = (event) => {
        const checked = event.currentTarget.checked;
        const num = event.currentTarget.value;
        let newAgrees = agrees.slice();
        newAgrees[num] = checked;
        setAgrees(newAgrees);
    };

    const toggleAgreeAll = (event) => {
        const checked = event.currentTarget.checked;
        setAgreeAll(checked);
        setAgrees([checked, checked, checked]);
    };

    const handleAgreeAll = () => {
        const agreed = agrees.filter(item => item === true);
        setAgreeAll(agreed.length >= 3);
    };

    useEffect(() => {
        handleAgreeAll();
    }, [agrees]);

    const RENDER_FORM = () => (
        <Form
            onSubmit={ event => onFormSubmit(event) }
        >
            <div className="desc">
                회원가입을 위해 본인정보를 기입해주세요.
            </div>
            <fieldset>
                <div className="wrap">
                    <label htmlFor="uId">아이디</label>
                    <input 
                        type="text" 
                        name="uId" 
                        id="uId" 
                        placeholder="bonoland@naver.com" 
                        className="bd"
                    />
                </div>
                <div className="wrap">
                    <label htmlFor="uPwd01">비밀번호</label>
                    <input 
                        type="password" 
                        name="uPwd01" 
                        id="uPwd01" 
                        placeholder="문자, 숫자로 조합된 6~12자리 숫자" 
                        className="bd"
                    />
                </div>
                <div className="wrap">
                    <label htmlFor="uPwd02">비밀번호 확인</label>
                    <input 
                        type="password" 
                        name="uPwd02" 
                        id="uPwd02" 
                        className="bd"
                    />
                </div>
                <div className="wrap">
                    <label htmlFor="uName">이름</label>
                    <input 
                        type="text" 
                        name="uName" 
                        id="uName" 
                        className="bd"
                    />
                </div>
            </fieldset>
            <hr />
            <Agreement> 
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="agree0" 
                            name="agree" 
                            value="전체동의" 
                            checked={ agreeAll } 
                            onChange={ event => toggleAgreeAll(event) } 
                        />
                        <label htmlFor="agree0"></label>
                    </div>
                    <span>전체동의</span>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="agree01" value="0" checked={ agrees[0] } onChange={ event => toggleAgrees(event) } />
                        <label htmlFor="agree01"></label>
                    </div>
                    <Link to="/terms">이용약관</Link>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="agree02" value="1" checked={ agrees[1] } onChange={ event => toggleAgrees(event) } />
                        <label htmlFor="agree02"></label>
                    </div>
                    <Link to="/terms">개인정보처리방침</Link>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="agree03" value="2" checked={ agrees[2] } onChange={ event => toggleAgrees(event) }/>
                        <label htmlFor="agree03"></label>
                    </div>
                    <Link to="/terms">위치기반서비스 이용동의</Link>
                </div>
            </Agreement>
            <div className="action">
                <button type="submit">회원가입</button>
            </div>
        </Form>
    )

    return (
        <>
            {
                isBrowser &&
                RENDER_FORM()
            }
            {
                isMobile && 
                <module.scrollWrapper>
                    { RENDER_FORM() }
                </module.scrollWrapper>
            }
        </>
    )
};

export default SignupForm;