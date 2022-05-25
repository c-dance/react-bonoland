import { useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import { module } from '../../themes/module';
import { AgreementBox, Terms } from './AgreementStyle';

const Agreement = ({ 
    subTitle, 
    content, 
    label, 
    isChecked, 
    onAgreeClick,
    onAgreeSubmit,
}) => {

    const MOBILE_DEVICE = useContext(LayoutContext) === 'mobile';

    return (
        <AgreementBox className={ MOBILE_DEVICE && "mobile" }>
            <h3>{ subTitle }</h3>
            <Terms className={ MOBILE_DEVICE && "mobile" }>
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