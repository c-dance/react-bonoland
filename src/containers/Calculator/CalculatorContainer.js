import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';
import CalculatorResult from '../../components/Calculator/CalculatorResult/CalculatorResult';
import { deactivateCalculator } from '../../store/actions/mode';
import { module } from '../../themes/module';
import { INCOME_DATASET, INCOME_RESULT, GET_INCOME_RESULT } from '../../sheme/calculator';

const initialFormData = {
    type: "단독요양원",
    capacity: "0",
    commons: "0",
    premiums: "0",
    premiumPrice: "0",
    helpers: "0",
    penalty: "0",
    price: "0",
    loan: "0",
    rent: "0"
};

const CalculatorContainer = () => {

    const dispatch = useDispatch();

    // 수익계산기 입력폼, 입력폼 subtmit
    const [ formData, setFormData ] = useState(initialFormData);

    // 수익계산기 결과폼
    const [ result, setResult ] = useState({});

    // 수익계산기 submit
    const submitForm = data => calculateIncome(data);

    // 수익계산기 초기화
    const resetForm = (event) => {
        event.preventDefault();
        setFormData(Object.assign({},initialFormData));
    };

    const calculateIncome = data => {
        const HAS_DATA = Object.keys(data).filter( key => data[key] !== "0").length > 1;

        if(HAS_DATA) {
            const results = GET_INCOME_RESULT(data);
            setResult(results);
        } else {
            setResult({});
        }
    };

    useEffect(() => {
        calculateIncome(formData);
    }, [formData]);
    

    const CALCULATOR_TEMPLATE = () => (
        <CalculatorForm
            initialData={ formData }
            onFormSubmit={ submitForm }
            onFormReset={ resetForm }
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
            <MobileSection 
                title="수익 계산"
                onBackClick={() => {dispatch(deactivateCalculator());}}
            >
            { CALCULATOR_TEMPLATE() }
            </MobileSection>
        }
        </>
    )
}

export default CalculatorContainer;