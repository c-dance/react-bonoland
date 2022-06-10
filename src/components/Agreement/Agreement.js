import React from 'react';
import { module } from '../../themes/module';
import { AgreementBox, Terms } from './AgreementStyle';
import { get, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { activateAlert } from '../../store/actions/alert';
import { getValue } from '@testing-library/user-event/dist/utils';

const Agreement = ({ 
    subTitle, 
    content, 
    label, 
    onAgreeSubmit,
}) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ mode: "onSubmit" });

    if(errors.agree) {
        dispatch(activateAlert({
            title: "개인정보 수집 동의",
            contents: "개인정보 수집 및 이용에 동의 시 매물 접수가 가능합니다."
        }));
    }

    return (
        <AgreementBox>
            <h3>{ subTitle }</h3>
            <Terms>
                <div>
                    { content }
                </div>
            </Terms>
            <form onSubmit={ handleSubmit(onAgreeSubmit) }>
                <fieldset>
                    <input
                        type="checkbox"
                        name="agree"
                        id="agree01"
                        {...register("agree", { required: true })}
                    />
                    <label
                        htmlFor="agree01"
                    >
                        { label }
                    </label>
                </fieldset>
                <module.SubmitButton
                    className={ !getValues("agree") && "disabled"}
                >
                    다음
                </module.SubmitButton>
            </form>
        </AgreementBox>
    )
};

export default Agreement;