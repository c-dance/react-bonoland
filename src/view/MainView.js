import React from 'react';
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
import LoginRequired from '../components/global/LoginRequired/LoginRequired';
import Alert from '../containers/Alert/Alert';
import ContactContaier from '../containers/Contact/ContactContainer';
import RegisterContainer from '../containers/Register/RegisterContainer';
/* page */
import NewsContainer from '../containers/News/NewsContainer';
import UserMenuContainer from '../containers/User/UserMenuContainer';
import UserInfoContainer from '../containers/User/UserInfoContainer';
import UserScrapContainer from '../containers/User/UserScrapContainer';
import UserRecentContainer from '../containers/User/UserRecentContainer';
import UserAlarmContainer from '../containers/User/UserAlarmContainer';
import UserAlarmFormContainer from '../containers/User/UserAlarmFormContainer';

const MainView = ({ list, children }) => {

    console.log('main view rendering');

    const LIST_MODE = list;

    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    const SIGNUP_MODE  = useSelector(state => state.Service.signup);
    const LOGIN_MODE  = useSelector(state => state.Service.login);
    const FIND_ID_MODE  = useSelector(state => state.Service.findId);
    const FIND_PWD_MODE  = useSelector(state => state.Service.findPwd);
    const LOGIN_REQUIRED_MODE = useSelector(state => state.Service.loginRequired);
    const CALCULATOR_MODE = useSelector(state => state.Service.calculator);
    const ALERT_MODE = useSelector(state => state.Alert.active);
    const CONTACT_MODE = useSelector(state => state.Service.contact);
    const CONTACT_DATA= useSelector(state => state.Service.contactData);
    const REGISTER_MODE = useSelector(state => state.Service.register);

    const NEWS_MODE = useSelector(state => state.Page.news);
    const MY_MENU_MODE = useSelector(state => state.Page.myMenu);
    const MY_INFO_MODE = useSelector(state => state.Page.myInfo);
    const MY_ALARM_MODE = useSelector(state => state.Page.myAlarm);
    const MY_ALARM_FORM_MODE = useSelector(state => state.Page.myAlarmForm);
    const MY_RECENT_MODE = useSelector(state => state.Page.myRecent);
    const MY_SCRAP_MODE = useSelector(state => state.Page.myScrap);

    // 만약 비로그인 되면 alert 창 띄워주는 스크립트 작성할 것.

    return(
        <>      
            { isBrowser && <GlobalHeader /> }
            { isMobile && <MobileTabBar /> }
            <Main>
                <QuickMenu /> 
                <Outlet />
                {/* { LIST_MODE && <CenterListContainer />} */}
                
                { NEWS_MODE && <NewsContainer /> }

                { IS_LOGGEDIN && MY_MENU_MODE && <UserMenuContainer /> }
                { IS_LOGGEDIN && MY_INFO_MODE && <UserInfoContainer /> }
                { IS_LOGGEDIN && MY_ALARM_MODE && <UserAlarmContainer /> }
                { IS_LOGGEDIN && MY_ALARM_FORM_MODE && <UserAlarmFormContainer /> }
                { IS_LOGGEDIN && MY_RECENT_MODE && <UserRecentContainer /> }
                { IS_LOGGEDIN && MY_SCRAP_MODE && <UserScrapContainer /> }
                
                { !IS_LOGGEDIN && SIGNUP_MODE && <SignupContaienr /> }
                { !IS_LOGGEDIN && LOGIN_MODE && <LoginContainer /> }
                { !IS_LOGGEDIN && FIND_ID_MODE && <FindIdContainer /> }
                { FIND_PWD_MODE && <FindPwdContainer /> }

                { CALCULATOR_MODE && <CalculatorContainer /> }
                { CONTACT_MODE && <ContactContaier centerData={ CONTACT_DATA } /> }
                { REGISTER_MODE && <RegisterContainer /> }
                { ALERT_MODE && <Alert /> }

                <MapChartContainer />
                <MapContainer />
                { !IS_LOGGEDIN && LOGIN_REQUIRED_MODE && <LoginRequired /> }
            </Main>
        </>
    )
}

export default MainView;