import React from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import GlobalHeader from '../../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../../components/global/MobileTabBar/MobileTabBar';
import Main from '../../components/ui/Main/Main';
import QuickMenu from '../../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../Calculator/CalculatorContainer';
import SignupContaienr from '../Account/SignupContainer';
import FindPwdContainer from '../Account/FindPwdContainer';
import FindIdContainer from '../Account/FindIdContainer';
import LoginContainer from '../Account/LoginContainer';

const LayoutContainer = ({ children }) => {

    let SIGNUP_MODE  = useSelector(state => state.Mode.signup);
    let LOGIN_MODE  = useSelector(state => state.Mode.login);
    let FIND_ID_MODE  = useSelector(state => state.Mode.findId);
    let FIND_PWD_MODE  = useSelector(state => state.Mode.findPwd);
    let CALCULATOR_MODE = useSelector(state => state.Mode.Calculator);

    return(
        <>
            {
                isBrowser &&
                <>
                    <GlobalHeader />
                    <Main>
                        <QuickMenu />
                        { children }
                    </Main> 
                </>
            }
            {
                isMobile &&
                <>
                    <MobileTabBar />
                        <QuickMenu /> 
                        { children }
                    <div className="mobile">
                    </div>
                </>
            }
            { SIGNUP_MODE && <SignupContaienr /> }
            { LOGIN_MODE && <LoginContainer /> }
            { FIND_ID_MODE && <FindIdContainer /> }
            { FIND_PWD_MODE && <FindPwdContainer /> }
            { CALCULATOR_MODE && <CalculatorContainer /> }
            
        </>
    )
}

export default LayoutContainer;