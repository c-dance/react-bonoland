import React, { useState } from 'react';
import { Form } from './CalculatorFormStyle';
import { module } from '../../../themes/module';
import { isBrowser, isMobile } from 'react-device-detect';
import { CALCULATOR_FORM } from '../../../sheme/calculator';

const CalculatorForm = ({ onFormSubmit }) => {

    return (
        <>
            {
                isMobile && 
                <module.MobileForm onSubmit={ (event) => onFormSubmit(event) }>
                    <fieldset className="cols">
                        {
                            CALCULATOR_FORM.map((item, idx) => (
                            <div className="wrap" key={idx}>
                                <label htmlFor={`cform${idx}`}>{ item.label }</label>
                                {
                                    item.type === "select" &&
                                    <select name={`cform${idx}`} id={`cform${idx}`}>
                                        {
                                            item.options.map((item, idx) => (
                                                <option 
                                                    key={item}
                                                    value={item} 
                                                    selected={ idx === 0 }
                                                >{item}</option>
                                            ))
                                        }
                                    </select>
                                }
                                {
                                    item.type === "input" &&
                                    <input type="text" name={`cform${idx}`} id={`cform${idx}`} placeholder={item.value} />
                                }
                            </div>
                            ))
                        }
                    </fieldset>
                    <button>계산하기</button>
                </module.MobileForm>
            }
            {
                isBrowser && 
                <Form onSubmit={ (event) => onFormSubmit(event) }>
                    <fieldset>
                        <legend>예상 수익 계산</legend>
                        <table>
                            <colgroup>
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    { 
                                        CALCULATOR_FORM
                                        .filter((item, idx) => ( idx < 5 ))
                                        .map((item, idx) => <th key={idx}><label htmlFor={`cform${idx}`}>{item.label}</label></th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    { 
                                        CALCULATOR_FORM
                                        .filter((item, idx) => ( idx < 5 ))
                                        .map((item, idx) =>
                                            item.type === "select"? 
                                                <td key={idx}>
                                                    <select name={`cform${idx}`} id={`cform${idx}`}>
                                                    {
                                                        item.options.map(item => (
                                                            <option value={item}>{item}</option>
                                                        ))
                                                    }
                                                    </select>
                                                </td>
                                            :
                                            <td key={idx}><input type="text" name={`cform${idx}`} id={`cform${idx}`} placeholder={item.value} /></td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <colgroup>
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    { 
                                        CALCULATOR_FORM
                                            .filter((item, idx) => (idx >= 5))
                                            .map((item, idx) => <th key={idx+4}><label htmlFor={`cform${idx+4}`}>{item.label}</label></th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                { 
                                    CALCULATOR_FORM
                                        .filter((item, idx) => ( idx >= 5 ))
                                        .map((item, idx) =>
                                            item.type === "select"? 
                                                <td key={idx+4}>
                                                    <select name={`cform${idx+4}`} id={`cform${idx+4}`}>
                                                    {
                                                        item.options.map(item => (
                                                            <option value={item}>{item}</option>
                                                        ))
                                                    }
                                                    </select>
                                                </td>
                                            :
                                            <td key={idx+4}><input type="text" name={`cform${idx+4}`} id={`cform${idx+4}`} placeholder={item.value} /></td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                    <module.SubmitButton>계산하기</module.SubmitButton>
                </Form>
            }
        </>

    )
};

export default CalculatorForm;