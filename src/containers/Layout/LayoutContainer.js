
import { useState } from 'react';
import GlobalHeader from '../../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../../components/global/MobileTabBar/MobileTabBar';
import QuickMenu from '../../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../Calculator/CalculatorContainer';

const LayoutContainer = ({ children }) => {

    /* === 예상수익 계산기 === */
    const [ calcActive, setCalcActive ] = useState(false);
    const toggleCalculator = () => {
        setCalcActive(!calcActive);
    };
    

    /* === 로그인 인증 === */


    return(
        <>
            <GlobalHeader
                onCalcClick={ toggleCalculator }
            />
            <MobileTabBar />
            <QuickMenu
                onCalcClick={ toggleCalculator }
            />
            <CalculatorContainer
                active={ calcActive }
                onCloseClick={ toggleCalculator }
            />
            { children }
        </>
    )
}

export default LayoutContainer;