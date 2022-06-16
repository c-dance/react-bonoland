import React, { useState, useEffect } from 'react';
import { Wrapper, Form } from './CalculatorFormStyle';
import { module } from '../../../themes/module';
import { isBrowser, isMobile } from 'react-device-detect';
import { CALCULATOR_FORM, CAPACITY_AND_PRICE, INCOME_DATASET } from '../../../sheme/calculator';
import { getNumber, getLocalNumber } from '../../../utils/number';
import { useOnlyNum } from '../../../hooks/form';
import Modal from '../../Modal/Modal'; 

/* === 옵션 가져오기 === */
const getOptionsFromObject = (obj) => {
    return Object.keys(obj).map(key => key);
};

const CalculatorForm = ({ initialData, onFormSubmit, onFormReset, children }) => {

    const [formData, setFormData] = useState(initialData);

    /* === 입력값 세팅 & VALIDATION === */
    const [type, setType] = useState(formData.type); // 요양시설 타입
    const [capacity, setCapacity] = useState(formData.capacity); // 정원수
    const [capacityOptions, setCapacityOptions] = useState([]); // 정원수 옵션

    const [price,  setPrice] = useState(formData.price); // 매매가(readonly)
    const [loan, setLoan] = useState(formData.loan); // 대출금(readonly)
    const [rent,  setRent] = useState(formData.Rent); // 월차임(readonly)

    const [commons, setCommons, clearCommons] = useOnlyNum(formData.commons); // 일반병실 현원수
    const [premiums, setPremiums, clearPremiums] = useOnlyNum(formData.premiums); // 상급병실 현원수
    const [premiumPrice, setPremiumPrice, clearPremiumPrice] = useOnlyNum(formData.premiumPrice); // 상급병실료
    
    const [helpers, setHelpers, clearHelpers] = useOnlyNum(formData.helpers); // 추가 요양보호사 수

    const [warning, setWarning] = useState(false);
    const [warningText, setWarningText] = useState("");


    /* === 정원수 옵션 세팅 === */
    const toggleCapacityOptions = type => {
        const options = getOptionsFromObject(CAPACITY_AND_PRICE[type].match);
        const hasNotPrevValue = options.filter(item => item === capacity).length <= 0;
        setCapacityOptions(options);
        if(hasNotPrevValue) setCapacity(options[0]);
    };

    /* === 매매가, 대출금, 월차임 자동입력 === */
    const setPriceAndRent = (type, capacity) => {
        const center =  CAPACITY_AND_PRICE[type];

        if(center) {
            if(center.match) { // [요양시설타입, 정원수, 매매가] 매칭
                setPrice(center.match[capacity]);

                if(center.loan) {
                    console.log(getNumber(center.match[capacity]));
                    setLoan(getLocalNumber(getNumber(center.match[capacity]) * center.loan));
                    setRent("0");
                }
            }
            if(center.rent) { // [주간보호, 정원수, 월차임]
                setRent(center.rent[capacity]);
                setLoan("0");
            }
        }
    };

    /* === 일반병실 현원수 설정 === */
    const handleMaxCapacity = (event, name) => {
        const nums = getNumber(event.currentTarget.value);
        const max = capacity - getNumber( name === "premiums" ? premiums : commons);

        if(nums > max) {
            event.preventDefault();
            setWarning(true);
            setWarningText("일반병실 현원수와 상급병실 현원수의 합이 정원수를 초과합니다.")
        } else {
            if(name === "premiums") setPremiums(event);
            if(name === "commons") setCommons(event);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const dataset = {
            ...INCOME_DATASET.capacity,
            type: type,
            capacity: capacity,
            commons: commons,
            premiums: premiums, 
            premiumPrice: premiumPrice,
            helpers: helpers,
            price: price,
            loan: loan,
            rent: rent
        };
        onFormSubmit(dataset);  
    };

    const setData = data => {
        // 데이터 초기화
        setCapacity(data.capacity);
        setPrice(data.price);
        setLoan(data.loan);
        setRent(data.Rent);
        setWarning(false);
        setWarningText("");
        clearCommons();
        clearPremiums();
        clearPremiumPrice();
        clearHelpers();
    };

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    useEffect(() => {
        toggleCapacityOptions(type);
    }, [type]);
    
    useEffect(() => {
        setPriceAndRent(type, capacity);
    }, [type, capacity]);


    return (
        <Wrapper className={ children? "calced" : "" }>
            <div>
            {
                isBrowser && 
                <Form 
                    onSubmit={ event => handleSubmit(event) }
                    onReset={ event => onFormReset(event) }
                >
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
                                        <select id="cf01" name="cf01" value={type} onChange={ event => setType(event.currentTarget.value) }>
                                            <option value="단독요양원">단독요양원</option>
                                            <option value="상가요양원">상가요양원</option>
                                            <option value="주간보호센터">주간보호센터</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select id="cf02" name="cf02" value={capacity} onChange={ event => setCapacity(event.currentTarget.value) }>
                                            {
                                                capacityOptions.map((item, idx) => 
                                                    <option 
                                                        key={idx}
                                                        value={item} 
                                                    >{item}</option>
                                                )
                                            }
                                        </select>
                                    </td>
                                    <td><input type="text" id="cf03" name="cf03" value={commons} placeholder="숫자 입력" autoComplete="off" onChange={ event => handleMaxCapacity(event, "commons") }/></td>
                                    <td><input type="text" id="cf04" name="cf04" value={premiums} placeholder="숫자 입력" autoComplete="off" onChange={ event => handleMaxCapacity(event, "premiums") }/></td>
                                    <td><input type="text" id="cf05" name="cf05" value={premiumPrice} placeholder="숫자 입력" autoComplete="off" onChange={ event => setPremiumPrice(event) }/></td>
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
                                    <td><input type="text" id="cf06" name="cf06" value={helpers} placeholder="숫자 입력" autoComplete="off" onChange={ event => setHelpers(event) }/></td>
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
                <module.MobileForm 
                    onSubmit={ event => handleSubmit(event) }
                    onReset={ event => onFormReset(event) }
                >
                    <fieldset className="cols">
                        <div className="wrap">
                            <label htmlFor="cf01">1. 요양시설 타입</label>
                            <select id="cf01" name="cf01" value={type} onChange={ event => setType(event.currentTarget.value) }>
                                <option value="단독요양원">단독요양원</option>
                                <option value="상가요양원">상가요양원</option>
                                <option value="주간보호센터">주간보호센터</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf02">2. 정원수</label>
                            <select id="cf02" name="cf02" value={capacity} onChange={ event => setCapacity(event.currentTarget.value) }>
                                {
                                    capacityOptions.map((item, idx) => 
                                        <option 
                                            key={idx}
                                            value={item} 
                                        >{item}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf03">3. 현원수(일반병실)</label>
                            <input type="text" id="cf03" name="cf03" value={commons} placeholder="숫자 입력" autoComplete="off" onChange={ event => handleMaxCapacity(event, "commons") }/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf04">4. 현원수(상급병실)</label>
                            <input type="text" id="cf04" name="cf04" value={premiums} placeholder="숫자 입력" autoComplete="off" onChange={ event => handleMaxCapacity(event, "premiums") }/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf05">5. 상급병실료</label>
                            <input type="text" id="cf05" name="cf05" value={premiumPrice} placeholder="숫자 입력" autoComplete="off" onChange={ event => setPremiumPrice(event) }/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf01">6. 추가 요양보호사</label>
                            <input type="text" id="cf06" name="cf06" value={helpers} placeholder="숫자 입력" autoComplete="off" onChange={ event => setHelpers(event) }/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf02">7. 예상 가산금(원/월)</label>
                            <input type="text" id="cf07" name="cf07" readOnly={true} placeholder="-" autoComplete="off"/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf03">8. 매매가(보증금)</label>
                            <input type="text" id="cf08" name="cf08" readOnly={true} value={price}/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf04">9. 대출금</label>
                            <input type="text" id="cf09" name="cf09" readOnly={true} value={loan}/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf05">10. 월차임(주간보호)</label>
                            <input type="text" id="cf10" name="cf10" readOnly={true} value={rent}/>
                        </div>
                    </fieldset>
                    <div className="actions">
                        <button type="submit">계산하기</button>
                        {/* <button type="reset">초기화</button> */}
                    </div>
                </module.MobileForm>
            }

            { children }
            </div>
            { 
                warning && 
                <Modal
                    title="수익 계산 오류"
                    width="360"
                    close={ true }
                    onCloseClick={ () => setWarning(false) }
                >
                    <div>{ warningText }</div>
                </Modal> 
            }
        </Wrapper>
    )
};

export default CalculatorForm;