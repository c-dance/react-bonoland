import { useState } from 'react';
import { AgreementBox, Form, Terms } from './AgreementStyle';
import { module } from '../../themes/module';

const Agreement = ({ 
    subTitle, 
    content, 
    label, 
    isChecked, 
    onAgreeClick,
    onAgreeSubmit 
}) => {

    return (
        <AgreementBox>
            <h3>{ subTitle }</h3>
            <Terms>
                <div>
                    { content }
                </div>
            </Terms>
            <Form onSubmit={ event => onAgreeSubmit(event) }>
                <fieldset>
                    <input
                        type="checkbox"
                        name="agree"
                        id="agree01"
                        value={ isChecked }
                        onChange={ event => onAgreeClick(event) }
                    />
                    <label
                        htmlFor="agree01"
                    >
                        { label }
                    </label>
                </fieldset>
                <module.SubmitButton
                    className={ !isChecked && "disabled"}
                >
                    다음
                </module.SubmitButton>
            </Form>
        </AgreementBox>
    )
};

export default Agreement;