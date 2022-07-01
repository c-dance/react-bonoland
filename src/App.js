import React, { useEffect } from 'react';

import { USER_AUTH } from "./utils/user";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "./store/actions/user";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// CENTERS
import CenterListContainer from './containers/Center/CenterListContainer';
import CenterItemContainer from './containers/Center/CenterItemContainer';
// SALES && RECOMMENDS
import SalesListContainer from './containers/Sales/SalesListContainer';
import RecommendListContainer from './containers/Recommend/RecommendListConatiner';
// NEWS
import NewsListContainer from './containers/News/NewsListContainer';
import NewsItemContainer from './containers/News/NewsItemContainer';
// USER
import UserMenuContainer from './containers/User/UserMenuContainer';
import UserRecentContainer from './containers/User/UserRecentContainer';
import UserScrapContainer from './containers/User/UserScrapContainer';
import UserAlarmContainer from './containers/User/UserAlarmContainer';
import UserInfoContainer from './containers/User/UserInfoContainer';
// REIGSTER
import RegisterContainer from './containers/Register/RegisterContainer';
//CONTACT
import ContactContainer from './containers/Contact/ContactContainer';
// TERMS
import TermsContainer from './containers/Terrms/TermsContainer';
import MainView from './view/MainView';


const App = () => {

  const dispatch = useDispatch();
  
  const USER = USER_AUTH.get();
  if(USER) dispatch(setLoggedIn(USER));
  
  const ONLY_LOGGEDIN = component => {
    const USER_LOGGEDIN = useSelector(state => state.User.loggedIn);

    if(USER_LOGGEDIN){
      return component;
    } else { 
      return <Navigate to='/' replace />
    };
  };

  return (
    <Routes>
      <Route element={ <MainView list={ true }/> }>
        <Route exact path="/"/>
        <Route exact path="/center/:id" element={ <CenterItemContainer /> } />

        {/* <Route exact path="/user" element={ ONLY_LOGGEDIN(<UserMenuContainer />) } />
        <Route exact path="/user/recent" element={ ONLY_LOGGEDIN(<UserRecentContainer />) } />

        <Route exact path="/user/scrap" element={ ONLY_LOGGEDIN(<UserScrapContainer />) } />
        <Route exact path="/user/scrap/:category" element={ ONLY_LOGGEDIN(<UserScrapContainer />) } />

        <Route exact path="/user/alarm" element={ ONLY_LOGGEDIN(<UserAlarmContainer />) } />
        <Route exact path="/user/info" element={ ONLY_LOGGEDIN(<UserInfoContainer />) } />

        <Route exact path="/news" element={ <NewsListContainer /> } />
        <Route exact path="/news/:id" element={ <NewsItemContainer /> } />
        <Route exact path="/register" element={ <RegisterContainer /> } /> */}

        <Route exact path="/sales" element={ <SalesListContainer /> } />
        <Route exact path="/recommend" element={ <RecommendListContainer /> } />
      </Route>
      <Route element={ <MainView list={ false }/> }>
        {/* <Route exact path="/center/:id" element={ <CenterItemContainer /> } /> */}

        {/* <Route exact path="/sales" element={ <SalesListContainer /> } /> */}
        {/* <Route exact path="/sales/:category" element={ <SalesListContainer /> } /> */}
        {/* <Route exact path="/sales/center/:id" element={ <CenterItemContainer /> } /> */}

        {/* <Route exact path="/recommend" element={ <RecommendListContainer /> } /> */}
        {/* <Route exact path="/recommend/:category" element={ <RecommendListContainer /> } /> */}
        {/* <Route exact path="/recommend/center/:id" element={ <CenterItemContainer /> } /> */}
      </Route>
      <Route exact path="/terms" element={ <TermsContainer /> } />
      <Route exact path="/terms/:category" element={ <TermsContainer /> } />
    </Routes>
)};

export default App;

