import React from 'react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { isBrowser, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import GlobalHeader from '../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../components/global/MobileTabBar/MobileTabBar';
import Main from '../components/ui/Main/Main';
import MapContainer from '../containers/Map/MapContainer';
import CenterListContainer from '../containers/Center/CenterListContainer';
import QuickMenu from '../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../containers/Calculator/CalculatorContainer';
import SignupContaienr from '../containers/Account/SignupContainer';
import FindPwdContainer from '../containers/Account/FindPwdContainer';
import FindIdContainer from '../containers/Account/FindIdContainer';
import LoginContainer from '../containers/Account/LoginContainer';
import MapChartContainer from '../containers/MapChart/MapChartContainer';
import UserAlarmFormContainer from '../containers/User/UserAlarmFormContainer';
import LoginRequired from '../components/global/LoginRequired/LoginRequired';
import Alert from '../containers/Alert/Alert';
import CenterItem from '../containers/Center/CenterItemContainer';

const MainView = ({ list, children }) => {

    const LIST_MODE = list;

    const SIGNUP_MODE  = useSelector(state => state.Mode.signup);
    const LOGIN_MODE  = useSelector(state => state.Mode.login);
    const FIND_ID_MODE  = useSelector(state => state.Mode.findId);
    const FIND_PWD_MODE  = useSelector(state => state.Mode.findPwd);
    const LOGIN_REQUIRED_MODE = useSelector(state => state.Mode.loginRequired);
    const CALCULATOR_MODE = useSelector(state => state.Mode.calculator);
    const ALARM_MODE = useSelector(state => state.Mode.alarm);
    const ALERT_MODE = useSelector(state => state.Alert.active);
    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    return(
        <>      
            { isBrowser && <GlobalHeader /> }
            { isMobile && <MobileTabBar /> }
            <Main>
                <QuickMenu /> 
                { LIST_MODE && <CenterListContainer />}
                { !IS_LOGGEDIN && SIGNUP_MODE && <SignupContaienr /> }
                { !IS_LOGGEDIN && LOGIN_MODE && <LoginContainer /> }
                { !IS_LOGGEDIN && FIND_ID_MODE && <FindIdContainer /> }
                { !IS_LOGGEDIN && FIND_PWD_MODE && <FindPwdContainer /> }
                { CALCULATOR_MODE && <CalculatorContainer /> }
                { ALERT_MODE && <Alert /> }
                <MapChartContainer />
                <MapContainer />
                <Outlet />
                { IS_LOGGEDIN && ALARM_MODE && <UserAlarmFormContainer /> }
                { !IS_LOGGEDIN && LOGIN_REQUIRED_MODE && <LoginRequired /> }
            </Main>
        </>
    )
}

export default MainView;