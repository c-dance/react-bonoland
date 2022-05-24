import GlobalHeader from '../../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../../components/global/MobileTabBar/MobileTabBar';
import GlobalMain from '../../components/global/GlobalMain/GlobalMain';
import QuickMenu from '../../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../Calculator/CalculatorContainer';
import React, { useState, useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';

const LayoutContainer = ({ children }) => {

    const DEVICE = useContext(LayoutContext);

    /* === 예상수익 계산기 === */
    const [ calcActive, setCalcActive ] = useState(false);
    const toggleCalculator = () => {
        setCalcActive(!calcActive);
    };
    
    /* === 로그인 인증 === */

    /* === 회원가입 ==== */
    const [ joinActive, setJoinActive ] = useState(false);
    const [ joinForm, setJoinForm ] = useState({});
    const toggleJoinActive = () => {
        setJoinActive(!joinActive);
    };


    return(
        <>
            {
                DEVICE === "browser" && <>
                    <GlobalHeader onCalcClick={ toggleCalculator }/>
                    <GlobalMain>
                        { children }
                    </GlobalMain>
                </>
            }
            {
                DEVICE === "mobile" && <>
                    <MobileTabBar />
                    { children }
                </>
            }
            <CalculatorContainer active={ calcActive } onCloseClick={ toggleCalculator } />
            <QuickMenu onCalcClick={ toggleCalculator } />
        </>
    )
}

export default LayoutContainer;