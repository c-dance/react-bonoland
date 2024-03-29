import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, Form, ResetIcon } from './CalculatorFormStyle';
import { module } from '../../../themes/module';
import { isBrowser, isMobile } from 'react-device-detect';
import { TYPE_AND_CAPACITY, CAPACITY_AND_PRICE, INCOME_DATASET } from '../../../scheme/calculator';
import { getNumber, getLocalNumber } from '../../../utils/number';
import { useOnlyNum } from '../../../hooks/form';
import Modal from '../../Modal/Modal'; 

/* === 옵션 가져오기 === */
const getOptionsFromObject = (obj) => {
    return Object.keys(obj).map(key => key);
};

const CalculatorForm = ({ 
    initialData, 
    onFormSubmit, 
    onFormReset, 
    resetAble, 
    inputAble, 
    children 
}) => {

    /* === 입력값 세팅 & VALIDATION === */
    const [type, setType] = useState(""); // 요양시설 타입
    const [capacity, setCapacity] = useState(""); // 정원수
    const [capacityOptions, setCapacityOptions] = useState([]); // 정원수 옵션

    const [price,  setPrice] = useState(""); // 매매가(readonly)
    const [loan, setLoan] = useState(""); // 대출금(readonly)
    const [rent,  setRent] = useState(""); // 월차임(readonly)

    const [commons, setCommons, clearCommons] = useOnlyNum(""); // 일반병실 현원수
    const [premiums, setPremiums, clearPremiums] = useOnlyNum(""); // 상급병실 현원수
    const [premiumPrice, setPremiumPrice, clearPremiumPrice] = useOnlyNum(""); // 상급병실료
    const [helpers, setHelpers, clearHelpers] = useOnlyNum(""); // 추가 요양보호사 수
    const [penalty, setPenalty, clearPenalty] = useOnlyNum("");

    const [warning, setWarning] = useState(false); // 경고 문구
    const [warningText, setWarningText] = useState("");

    const focusRef = useRef();

    const initForm = data => {
        const DEFAULT_TYPE = data.type || TYPE_AND_CAPACITY[Object.keys(TYPE_AND_CAPACITY)[0]];
        const DEFAULT_CAPACITY = data.capacity || TYPE_AND_CAPACITY[DEFAULT_TYPE][0];
        const DEFAULT_PRICE = data.price || CAPACITY_AND_PRICE[DEFAULT_TYPE]["match"][DEFAULT_CAPACITY];
        const DEFAULT_LOAN = DEFAULT_TYPE === "주간보호센터"? "" : (data.loan || CAPACITY_AND_PRICE[DEFAULT_TYPE]["loan"] * DEFAULT_PRICE);
        const DEFAULT_RENT = DEFAULT_TYPE === "주간보호센터"? (data.rent || CAPACITY_AND_PRICE[DEFAULT_PRICE]["rent"][DEFAULT_CAPACITY]) : "" ;

        setType(DEFAULT_TYPE);
        setCapacity(DEFAULT_CAPACITY);
        setPrice(DEFAULT_PRICE);
        setLoan(DEFAULT_LOAN);
        setRent(DEFAULT_RENT);
        setWarning(false);
        setWarningText("");
        clearCommons(data.commons);
        clearPremiums(data.premiums);
        clearPremiumPrice(data.premiumPrice);
        clearHelpers(data.helpers);
        clearPenalty(data.penalty);
    };

    /* === 정원수 옵션 세팅 === */
    const handleCapacityOptions = type => {
        const options = getOptionsFromObject(CAPACITY_AND_PRICE[type].match);
        const hasNotPrevValue = options.filter(item => item === capacity).length <= 0;
        
        setCapacityOptions(options);
        if(hasNotPrevValue) setCapacity(options[0]);
    };

    /* === 매매가, 대출금, 월차임 자동입력 === */
    const handlePriceAndRent = (type, capacity) => {
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
    const handlePeople = (event, name) => {
        const nums = getNumber(event.currentTarget.value);
        const max = capacity - getNumber( name === "premiums" ? commons : premiums);

        if(nums > max) {
            event.preventDefault();
            setWarning(true);
            setWarningText("일반병실 현원수와 상급병실 현원수의 합이 정원수를 초과합니다.")
        } else {
            if(name === "premiums") setPremiums(event);
            if(name === "commons") setCommons(event);
        }
    };

    const handleCapacity = capacity => {
        const CAPACITY_EXCESS = getNumber(capacity) - (getNumber(commons) + getNumber(premiums)) < 0;
        if(CAPACITY_EXCESS) {
            clearCommons();
            clearPremiums();
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if(commons.length <= 0){
            setWarningText("3.현원수(일반병실)은 필수 입력값 입니다.");
            setWarning(true);
        } else {
            onFormSubmit({
                type: type,
                capacity: capacity,
                commons: commons,
                premiums: premiums, 
                premiumPrice: premiumPrice,
                helpers: helpers,
                price: price,
                loan: loan,
                rent: rent,
                penalty: penalty
            });  
        }
        
    };

    useEffect(() => {
        if(initialData) initForm(initialData);
    }, [initialData]);

    useEffect(() => {
        if(type.length > 0 && inputAble) handleCapacityOptions(type);
    }, [type]);
    
    useEffect(() => {
        if(type.length > 0 && capacity.length > 0 && inputAble){ 
            handlePriceAndRent(type, capacity);
            handleCapacity(capacity);
        }
    }, [type, capacity]);

    useEffect(() => {
        if(children && isMobile) {
            focusRef.current.focus();
        }
    }, [children]);

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
                                        <select 
                                            id="cf01" 
                                            name="cf01" 
                                            value={type} 
                                            onChange={ event => setType(event.currentTarget.value) }
                                            disabled={ !inputAble }
                                        >
                                            <option value="단독요양원">단독요양원</option>
                                            <option value="상가요양원">상가요양원</option>
                                            <option value="주간보호센터">주간보호센터</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select 
                                            id="cf02" 
                                            name="cf02" 
                                            value={capacity} 
                                            onChange={ event => setCapacity(event.currentTarget.value) }
                                            disabled={ !inputAble }
                                        >
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
                                    <td><input type="text" id="cf03" name="cf03" value={commons} placeholder="숫자 입력" autoComplete="off" onChange={ event => handlePeople(event, "commons") } readOnly={ !inputAble }/></td>
                                    <td><input type="text" id="cf04" name="cf04" value={premiums} placeholder="숫자 입력" autoComplete="off" onChange={ event => handlePeople(event, "premiums") } readOnly={ !inputAble }/></td>
                                    <td><input type="text" id="cf05" name="cf05" value={premiumPrice} placeholder="숫자 입력" autoComplete="off" onChange={ event => setPremiumPrice(event) } readOnly={ !inputAble }/></td>
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
                                    <td><input type="text" id="cf06" name="cf06" value={helpers} placeholder="숫자 입력" autoComplete="off" onChange={ event => setHelpers(event) } readOnly={ !inputAble }/></td>
                                    <td><input type="text" id="cf07" name="cf07" value={penalty} placeholder="숫자 입력" autoComplete="off" onChange={ event => setPenalty(event) } readOnly={ !inputAble }/></td>
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
                            <input type="text" id="cf03" name="cf03" value={commons} placeholder="숫자 입력" autoComplete="off" onChange={ event => handlePeople(event, "commons") }/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cf04">4. 현원수(상급병실)</label>
                            <input type="text" id="cf04" name="cf04" value={premiums} placeholder="숫자 입력" autoComplete="off" onChange={ event => handlePeople(event, "premiums") }/>
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
                            <input type="text" id="cf07" name="cf07" value={penalty} placeholder="숫자 입력" autoComplete="off" onChange={ event => setPenalty(event) }/>
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
                            <input type="text" id="cf10" name="cf10" readOnly={true} value={rent} ref={ focusRef }/>
                        </div>
                    </fieldset>
                    <div className="actions">
                        { !resetAble && <button type="submit">계산하기</button>}
                        { resetAble &&  <button type="reset">초기화<ResetIcon /></button> }
                    </div>
                </module.MobileForm>
            }
            { children }
            </div>
            { 
                warning && 
                <Modal
                    title="수익 계산"
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