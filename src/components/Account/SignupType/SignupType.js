import { Form, TypeBoxes } from './SignupTypeStyle';
import React from "react";

const SignupType = ({
    type,
    onTypeChange,
    onTypeSubmit
}) => {
    return (
        <Form onSubmit={ event => onTypeSubmit(event) } >
            <div className="desc">
                매도/매수중 하나를 선택해주세요.
            </div>
            <TypeBoxes>
                <div>
                    <input type="radio" name="sType" id="sType01" value="매도희망" onChange={ event => onTypeChange(event) } checked={ type === "매도희망" } />
                    <label htmlFor="sType01">매도희망</label>
                </div>
                <div>
                    <input type="radio" name="sType" id="sType02" value="매수희망" onChange={ event => onTypeChange(event) } checked={ type === "매수희망" } />
                    <label htmlFor="sType02">매수희망</label>
                </div>
            </TypeBoxes>
            <div className="action">
                <button type="submit">다음</button>
            </div>
        </Form>
    )
};

export default SignupType;