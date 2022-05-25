import React, { useState, useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import GlobalHeader from '../../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../../components/global/MobileTabBar/MobileTabBar';
import GlobalMain from '../../components/global/GlobalMain/GlobalMain';
import QuickMenu from '../../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../Calculator/CalculatorContainer';
import signUpContainer from '../Account/SignUpContainer';
import SignUpContaienr from '../Account/SignUpContainer';

const LayoutContainer = ({ children }) => {

    const DEVICE = useContext(LayoutContext);

    /* === 예상수익 계산기 === */
    const [ calcActive, setCalcActive ] = useState(false);
    const toggleCalculator = () => {
        setCalcActive(!calcActive);
    };
    
    /* === 로그인 인증 === */

    /* === 회원가입 ==== */
    const [ signUpActive, setSignUpnActive ] = useState(false);
    const togglesignUp = () => {
        setSignUpnActive (!signUpActive);
    };


    return(
        <>
            {
                DEVICE === "browser" && <>
                    <GlobalHeader 
                        onCalcClick={ toggleCalculator }
                        onSignUpClick={ togglesignUp }
                    />
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
            <CalculatorContainer 
                active={ calcActive } 
                toggleActive={ toggleCalculator } 
            />
            <QuickMenu 
                onCalcClick={ toggleCalculator } 
            />
            <SignUpContaienr
                active={ signUpActive }
                toggleActive={ togglesignUp }
            />
        </>
    )
}

export default LayoutContainer;