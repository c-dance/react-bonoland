import React, { useState, useEffect } from 'react';
import { Wrapper, Form } from './CalculatorFormStyle';
import { module } from '../../../themes/module';
import { isBrowser, isMobile } from 'react-device-detect';
import { CALCULATOR_FORM, CAPACITY_AND_PRICE } from '../../../sheme/calculator';
import { getNumber, getLocalNumber } from '../../../utils/number';
import { useOnlyNum } from '../../../hooks/form';

const CalculatorForm = ({ onFormSubmit, onFormReset, children }) => {

    /* === 입력값 세팅 & VALIDATION === */
    const [type, setType] = useState("");

    const [capacityOptions, setCapacityOptions] = useState([]);
    const [capacity, setCapacity] = useState("");

    const [price,  setPrice] = useState("0");
    const [loan, setLoan] = useState("0");
    const [rent,  setRent] = useState("0");

    const [commons, setCommons] = useOnlyNum(0);
    const [premiums, setPremiums] = useOnlyNum(0);
    const [helpers, setHelpers] = useOnlyNum(0);

    /* === 옵션 가져오기 === */
    const getOptionsFromObject = (obj) => {
        return Object.keys(obj).map(key => key);
    };

    /* === 정원수 옵션 세팅 === */
    const toggleCapacityOptions = () => {
        CAPACITY_AND_PRICE.map(obj => {
            if(obj.item === type) {
                setCapacityOptions(getOptionsFromObject(obj.match));
                setCapacity(getOptionsFromObject(obj.match)[0]);
            }
        });
    };

    /* === 매매가, 대출금, 월차임 자동입력 === */
    const setPriceAndRent = () => {
        const center =  CAPACITY_AND_PRICE.filter(obj => obj.item === type)[0];
        if(center) {
            if(center.match) {
                setPrice(center.match[capacity]);
                if(center.loan) {
                    console.log(getNumber(center.match[capacity]));
                    setLoan(getLocalNumber(getNumber(center.match[capacity]) * center.loan));
                    setRent("0");
                }
            }
            if(center.rent) {
                setRent(center.rent[capacity]);
                setLoan("0");
            }
        }
    };

    /* === === */

    useEffect(() => {
        toggleCapacityOptions();
    }, [type]);
    
    useEffect(() => {
        console.log(capacity);
        setPriceAndRent();
    }, [capacity]);

    useEffect(() => {
        // 렌더링 이후 옵션값 세팅
        const defaultOptions = getOptionsFromObject(CAPACITY_AND_PRICE[0].match);
        setCapacityOptions(defaultOptions);
        setCapacity(defaultOptions[0]);
    }, []);

    return (
        <Wrapper>
            <div>
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
                                    <th><label htmlFor="cf01">1. 요양시설 타입</label></th>
                                    <th><label htmlFor="cf02">2. 정원수</label></th>
                                    <th><label htmlFor="cf03">3. 현원수(일반병실)</label></th>
                                    <th><label htmlFor="cf04">4. 현원수(상급병실)</label></th>
                                    <th><label htmlFor="cf05">5. 상급병실료</label></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select type="text" id="cf01" name="cf01" onChange={ event => setType(event.currentTarget.value) }>
                                            <option value="단독요양원" selected>단독요양원</option>
                                            <option value="상가요양원">상가요양원</option>
                                            <option value="주간보호센터">주간보호센터</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select type="text" id="cf02" name="cf02" onChange={ event => setCapacity(event.currentTarget.value) }>
                                            {
                                                capacityOptions.map((item, idx) => 
                                                    <option 
                                                        valeu={item} 
                                                        selected={ capacity === item }
                                                    >{item}</option>
                                                )
                                            }
                                        </select>
                                    </td>
                                    <td><input type="text" id="cf03" name="cf03" value={commons} placeholder="숫자 입력" autoComplete="off" onChange={ event => setCommons(event) }/></td>
                                    <td><input type="text" id="cf04" name="cf04" value={premiums} placeholder="숫자 입력" autoComplete="off" onChange={ event => setPremiums(event) }/></td>
                                    <td><input type="text" id="cf05" name="cf05" value={helpers} placeholder="숫자 입력" autoComplete="off" onChange={ event => setHelpers(event) }/></td>
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
                                    <th><label htmlFor="cf01">6. 추가 요양보호사</label></th>
                                    <th><label htmlFor="cf02">7. 예상 가산금(원/월)</label></th>
                                    <th><label htmlFor="cf03">8. 매매가(보증금)</label></th>
                                    <th><label htmlFor="cf04">9. 대출금</label></th>
                                    <th><label htmlFor="cf05">10. 월차임(주간보호)</label></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" id="cf06" name="cf06" placeholder="숫자 입력" autoComplete="off"/></td>
                                    <td><input type="text" id="cf07" name="cf07" readOnly={true} placeholder="-" autoComplete="off"/></td>
                                    <td><input type="text" id="cf08" name="cf08" readOnly={true} value={price}/></td>
                                    <td><input type="text" id="cf09" name="cf09" readOnly={true} value={loan}/></td>
                                    <td><input type="text" id="cf10" name="cf10" readOnly={true} value={rent}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                    <div className="actions">
                        <button type="submit">계산하기</button>
                        <button type="reset">초기화</button>
                    </div>
                </Form>
            }
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
                    <div className="actions">
                        <button type="submit">계산하기</button>
                        <button type="reset">초기화</button>
                    </div>
                </module.MobileForm>
            }

            { children }
            </div>
        </Wrapper>

    )
};

export default CalculatorForm;