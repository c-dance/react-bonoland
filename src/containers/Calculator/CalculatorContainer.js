import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from '../../components/Modal/Modal';
import Section from '../../components/ui/Section/Section';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';
import CalculatorResult from '../../components/Calculator/CalculatorResult/CalculatorResult';
import { deactivateCalculator, resetCalculator } from '../../store/actions/service';
import { INCOME_DATASET, GET_INCOME_RESULT } from '../../scheme/calculator';

const CalculatorContainer = () => {

    const dispatch = useDispatch();

    const calcData = useSelector(state => state.Service.calculatorData);

    const initialForm = Object.assign({}, INCOME_DATASET);
    const [ formData, setFormData ] = useState(initialForm); // 수익계산기 입력폼(기본 데이터)
    const [ result, setResult ] = useState({}); // 수익계산기 결과
    const [ resetAble, setResetAble ] = useState(false);

    // 수익계산기 submit
    const submitForm = data => {
        if(data.commons.length > 0) {
            dispatch(resetCalculator({
                input: data,
                output: GET_INCOME_RESULT(data)
            }))
        }
    }

    // 수익계산기 초기화
    const resetForm = event => {
        event.preventDefault();
        dispatch(resetCalculator());
    };

    useEffect(() => {
        if(calcData) {
            setFormData(calcData.input);
            setResult(calcData.output);
            setResetAble(true);
        } else {
            setFormData(initialForm);
            setResult({});
            setResetAble(false);
        }
    }, [calcData]);
    

    const CALCULATOR_TEMPLATE = () => (
        <CalculatorForm
            initialData={ formData }
            onFormSubmit={ submitForm }
            onFormReset={ resetForm }
            resetAble={ resetAble }
        >
            { Object.keys(result).length > 0 && <CalculatorResult result={ result } />}
        </CalculatorForm>
    );

    return (
        <> 
        {
            isBrowser &&
            <Modal
                open={ true }
                close={ true }
                onCloseClick={() => {dispatch(deactivateCalculator());}}
                title="수익 계산"
                width="970"
            >
            { CALCULATOR_TEMPLATE() }
            </Modal>
        }
        {
            isMobile &&
            <Section 
                title="수익 계산"
                themeColor="primary"
                back={ true }
                onBackClick={() => {dispatch(deactivateCalculator());}}
            >
            { CALCULATOR_TEMPLATE() }
            </Section>
        }
        </>
    )
}

export default CalculatorContainer;