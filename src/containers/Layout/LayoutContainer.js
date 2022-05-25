import React, { useState, useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import GlobalHeader from '../../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../../components/global/MobileTabBar/MobileTabBar';
import GlobalMain from '../../components/global/GlobalMain/GlobalMain';
import QuickMenu from '../../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../Calculator/CalculatorContainer';
import signUpContainer from '../Account/SignUpContainer';
import SignUpContaienr from '../Account/SignUpContainer';
import FindPwdContainer from '../Account/FindPwdContainer';
import FindIdContainer from '../Account/FindIdContainer';
import LoginContainer from '../Account/LoginContainer';

const LayoutContainer = ({ children }) => {

    const DEVICE = useContext(LayoutContext);

    /* === 예상수익 계산기 === */
    const [ calcActive, setCalcActive ] = useState(false);
    const toggleCalculator = () => {
        setCalcActive(!calcActive);
    };
    
    /* === 아이디 찾기 인증 === */
    const [ findIdActive, setFindIdActive ] = useState(false);
    const toggleFindId = () => {
        setFindIdActive(!findIdActive);
    }

    /* === 회원가입 ==== */
    const [ signUpActive, setSignUpnActive ] = useState(false);
    const togglesignUp = () => {
        setSignUpnActive (!signUpActive);
    };

    /* === 비밀번호 찾기 === */
    const [ findPwdActive, setFindPwdActive ] = useState(false);
    const toggleFindPwd = () => {
        setFindPwdActive(!findPwdActive);
    }


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
            <FindPwdContainer
                active={ findPwdActive }
                toggleActive={ toggleFindPwd }
            />
            <FindIdContainer
                active={ findIdActive }
            />
        </>
    )
}

export default LayoutContainer;