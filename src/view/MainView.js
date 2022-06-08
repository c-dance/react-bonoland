import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { isBrowser, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import GlobalHeader from '../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../components/global/MobileTabBar/MobileTabBar';
import Main from '../components/ui/Main/Main';
import MapContainer from '../containers/Map/MapContainer';
import MapChart from '../containers/MapChart/MapChartContainer';
import CenterListContainer from '../containers/Center/CenterListContainer';
import QuickMenu from '../components/global/QuickMenu/QuickMenu';
import CalculatorContainer from '../containers/Calculator/CalculatorContainer';
import SignupContaienr from '../containers/Account/SignupContainer';
import FindPwdContainer from '../containers/Account/FindPwdContainer';
import FindIdContainer from '../containers/Account/FindIdContainer';
import LoginContainer from '../containers/Account/LoginContainer';
import MapChartContainer from '../containers/MapChart/MapChartContainer';
import UserAlarmFormContainer from '../containers/User/UserAlarmFormContainer';
import { ChartWrap } from '../components/Chart/RadarChart/RadarChartStyle';
import Alert from '../containers/Alert/Alert';

const MainView = ({ list, children }) => {

    const LIST_MODE = list;
    const SIGNUP_MODE  = useSelector(state => state.Mode.signup);
    const LOGIN_MODE  = useSelector(state => state.Mode.login);
    const FIND_ID_MODE  = useSelector(state => state.Mode.findId);
    const FIND_PWD_MODE  = useSelector(state => state.Mode.findPwd);
    const CALCULATOR_MODE = useSelector(state => state.Mode.calculator);
    const ALARM_MODE = useSelector(state => state.Mode.alarm);
    const ALERT_MODE = useSelector(state => state.Alert.active);

    return(
        <>      
            { isBrowser && <GlobalHeader /> }
            { isMobile && <MobileTabBar /> }
            <Main>
                <QuickMenu /> 
                { LIST_MODE && <CenterListContainer />}
                { SIGNUP_MODE && <SignupContaienr /> }
                { LOGIN_MODE && <LoginContainer /> }
                { FIND_ID_MODE && <FindIdContainer /> }
                { FIND_PWD_MODE && <FindPwdContainer /> }
                { CALCULATOR_MODE && <CalculatorContainer /> }
                { ALERT_MODE && <Alert /> }
                <MapChartContainer />
                <MapContainer />
                <Outlet />
                { ALARM_MODE && <UserAlarmFormContainer /> }
            </Main>
        </>
    )
}

export default MainView;