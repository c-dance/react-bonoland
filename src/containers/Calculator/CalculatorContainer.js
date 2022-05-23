import { useState } from 'react';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';
import CalculatorResult from '../../components/Calculator/CalculatorResult/CalculatorResult';
import Modal from '../../components/Modal/Modal';

const CalculatorContainer = ({ active, onCloseClick }) => {

    // form
    // formData
    // formSubmitted
    const [ formData, setFormData ] = useState({});
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // result
    const [ result, setResult ] = useState({});
    // resultData

    // equation

    const onFormSubmit = (event) => {
        event.preventDefault();
        // 필수 입력값 검사
        setFormSubmitted(true);
    };

    const onFormReset = (event) => {
        event.preventDefault();
        setFormData({});
        setFormSubmitted(false);
    };

    return (
        <> 
            {
                active && !formSubmitted && <Modal
                    open={ !formSubmitted }
                    close={ true }
                    onCloseClick={ onCloseClick }
                    title="수익 계산"
                    width="970"
                >
                    <CalculatorForm
                        onFormSubmit={ onFormSubmit }
                    />
                </Modal>
            }
            {
                active && formSubmitted && <Modal
                    open={ formSubmitted }
                    close={ true }
                    onCloseClick={ onCloseClick }
                    title="수익계산"
                    height="700"
                >
                    <CalculatorResult 
                        onFormReset={ onFormReset }
                    />
                </Modal>
            }
        </>
    )
}

export default CalculatorContainer;