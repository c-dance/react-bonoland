import { useState, useContext } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from '../../components/Modal/Modal';
import MobileSection from '../../components/global/MobileSection/MobileSection';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';
import CalculatorResult from '../../components/Calculator/CalculatorResult/CalculatorResult';
import { LayoutContext } from '../../hooks/layout';

const CalculatorContainer = ({ active, onCloseClick }) => {

    const DEVICE = useContext(LayoutContext);

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
            active && DEVICE === "browser" &&
            <Modal
                open={ active }
                close={ true }
                title="수익 계산"
                width="970"
            >
            {
                !formSubmitted && <CalculatorForm
                    onFormSubmit={ onFormSubmit }
                    device="browser"
                />
            }
            {
                formSubmitted && <CalculatorResult 
                    onFormReset={ onFormReset }
                    device="browser"
                />
            }
            </Modal>
        }
        {
            active && DEVICE === "mobile" &&
            <MobileSection title="수익 계산">
                {
                    !formSubmitted && <CalculatorForm
                        onFormSubmit={ onFormSubmit }
                        device="mobile"
                    />
                }
                {
                    formSubmitted && <CalculatorResult 
                        onFormReset={ onFormReset }
                        device="mobile"
                    />
                }
            </MobileSection>
        }
        </>
    )
}

export default CalculatorContainer;