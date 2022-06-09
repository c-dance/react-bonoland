import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';
import CalculatorResult from '../../components/Calculator/CalculatorResult/CalculatorResult';
import { deactivateCalculator } from '../../store/actions/mode';
import { module } from '../../themes/module';

const CalculatorContainer = () => {

    const dispatch = useDispatch();

    // 수익계산기 입력폼, 입력폼 subtmit
    const [ formData, setFormData ] = useState({});
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // 수익계산기 결과폼
    const [ result, setResult ] = useState({});

    // 수익계산기 submit
    const submitForm = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };

    // 수익계산기 초기화
    const resetForm = (event) => {
        event.preventDefault();
        setFormData({});
        setFormSubmitted(false);
    };

    // 수익계산기 닫기
    const closeCaclulator = () => {
        setFormData({});
        setFormSubmitted(false);
        dispatch(deactivateCalculator());
    };

    const CALCULATOR_TEMPLATE = () => (
        <CalculatorForm
            onFormSubmit={ submitForm }
            onFormReset={ resetForm }
        >
            <CalculatorResult />
        </CalculatorForm>
    );

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