import React, { useState, useContext } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';
import CalculatorResult from '../../components/Calculator/CalculatorResult/CalculatorResult';
import { LayoutContext } from '../../hooks/layout';

const CalculatorContainer = ({ active, toggleActive }) => {

    const DEVICE = useContext(LayoutContext);

    // 수익계산기 입력폼, 입력폼 subtmit
    const [ formData, setFormData ] = useState({});
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // 수익계산기 결과폼
    const [ result, setResult ] = useState({});

    // 수익계산기 submit
    const onFormSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };

    // 수익계산기 초기화
    const onFormReset = (event) => {
        event.preventDefault();
        setFormData({});
        setFormSubmitted(false);
    };

    // 수익계산기 닫기
    const deactiveCaclulator = () => {
        setFormData({});
        setFormSubmitted(false);
        toggleActive();
    };

    return (
        <> 
        {
            active && DEVICE === "browser" &&
            <Modal
                open={ active }
                close={ true }
                onCloseClick={ deactiveCaclulator }
                title="수익 계산"
                width="970"
            >
                {
                    !formSubmitted && <CalculatorForm
                        onFormSubmit={ onFormSubmit }
                    />
                }
                {
                    formSubmitted && <CalculatorResult 
                        onFormReset={ onFormReset }
                    />
                }
            </Modal>
        }
        {
            active && DEVICE === "mobile" &&
            <MobileSection 
                title="수익 계산"
                onBackClick={ deactiveCaclulator }
            >
                {
                    !formSubmitted && <CalculatorForm
                        onFormSubmit={ onFormSubmit }
                    />
                }
                {
                    formSubmitted && <CalculatorResult 
                        onFormReset={ onFormReset }
                    />
                }
            </MobileSection>
        }
        </>
    )
}

export default CalculatorContainer;