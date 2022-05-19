import React, { useEffect } from 'react';
import { useInput } from '../../hooks/index';
import CalculatorForm from '../../components/Calculator/CalculatorForm/CalculatorForm';

const CalculatorFormContainer = () => {
    const [type, resetType] = useInput('');
    const [totalCap, resetTotalCap] = useInput(0);
    const [basicCap, resetBasicCap] = useInput(0);
    const [upperCap, resetUpperCap] = useInput(0);
    const [cost, resetCost] = useInput(0);
    const [helper, resetHelper] = useInput(0);
    const [cooker, resetCooker] = useInput(0);
    const [penalty, resetPenalty] = useInput(0);
    const [loan, resetLoan] = useInput(0);
    const [level, resetLevel] = useInput(0);

    const submitHandler = () => {

    };

    useEffect = () => {

    };
    
    return (
        <CalculatorForm
            type={ type }
            totalCap={ totalCap }
            basicCap={ basicCap }
            upperCap={ upperCap }
            cost={ cost }
            helper={ helper }
            cooker={ cooker }
            penalty={ penalty }
            loan={ loan }
            level={ level }
            submitHandler= { submitHandler }
        />
    );

};

export default CalculatorFormContainer;