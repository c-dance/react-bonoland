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
    type: "주간보호센터",
    capacity: "29",
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
    const submitForm = data => {
        setFormData(data);
    };

    // 수익계산기 초기화
    const resetForm = event => {
        // event.preventDefault();
        setFormData(INCOME_DATASET);
    };

    const calculateIncome = data => {
        const results = GET_INCOME_RESULT(data);
        setResult(results);
    };

    // 수익계산기 닫기
    const closeCaclulator = () => {
        dispatch(deactivateCalculator());
    };

    const CALCULATOR_TEMPLATE = () => (
        <CalculatorForm
            formData02={ formData }
            onFormSubmit={ submitForm }
            onFormReset={ resetForm }
        >
            { Object.keys(result).length > 0 && <CalculatorResult result={ result } />}
        </CalculatorForm>
    );

    // [1] 직접 입력 후 form data 변경
    // [2] fetch data 후 form data 변경
    useEffect(() => {
        calculateIncome(formData);
    }, [formData]);

    return (
        <> 
        {
            isBrowser &&
            <Modal
                open={ true }
                close={ true }
                onCloseClick={ closeCaclulator }
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
                onBackClick={ closeCaclulator }
            >
            { CALCULATOR_TEMPLATE() }
            </MobileSection>
        }
        </>
    )
}

export default CalculatorContainer;