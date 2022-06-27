import { Form, TypeBoxes } from './SignupTypeStyle';
import React, { useEffect, useState } from "react";

const SignupType = ({
    onTypeSubmit
}) => {

    const [ submitAble, setSubmitAble ] = useState(false);
    const [ warn, setWarn ] = useState(false);
    const [ type, setType ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(submitAble) {
            setWarn(false);
            onTypeSubmit(type);
        } else {
            setWarn(true);
        }
    };

    useEffect(() => {
        if(type.length > 0) setSubmitAble(true);
    }, [type])

    return (
        <Form onSubmit={ event => handleSubmit(event) } >
            <div className={`desc${warn? " warn" : ""}`}>
                매도/매수중 하나를 선택해주세요.
            </div>
            <TypeBoxes>
                <div>
                    <input 
                        type="radio" 
                        name="sType" 
                        id="sType01" 
                        value="매도희망" 
                        onChange={ (event) => setType(event.currentTarget.value) } 
                        checked={ type === "매도희망"}     
                    />
                    <label htmlFor="sType01">매도희망</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="sType" 
                        id="sType02" 
                        value="매수희망" 
                        onChange={ (event) => setType(event.currentTarget.value) } 
                        checked={ type === "매수희망" }     
                    />
                    <label htmlFor="sType02">매수희망</label>
                </div>
            </TypeBoxes>
            <div className="action">
                <button type="submit" className={submitAble? "" : "disabled"}>다음</button>
            </div>
        </Form>
    )
};

export default SignupType;