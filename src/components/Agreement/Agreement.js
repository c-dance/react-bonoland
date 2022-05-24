import { useState } from 'react';
import { AgreementBox, Terms } from './AgreementStyle';
import { module } from '../../themes/module';

const Agreement = ({ 
    subTitle, 
    content, 
    label, 
    isChecked, 
    onAgreeClick,
    onAgreeSubmit,
    device
}) => {

    return (
        <AgreementBox className={ device==="mobile" && "mobile"}>
            <h3>{ subTitle }</h3>
            <Terms className={ device==="mobile" && "mobile"}>
                <div>
                    { content }
                </div>
            </Terms>
            <form onSubmit={ event => onAgreeSubmit(event) }>
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
            </form>
        </AgreementBox>
    )
};

export default Agreement;