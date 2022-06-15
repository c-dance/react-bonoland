import React, { useEffect } from 'react';

import { USER_AUTH } from "./utils/user";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "./store/actions/user";
import { activateLogin } from './store/actions/mode';

import { Routes, Route, Navigate } from 'react-router-dom';

import LoginRequired from './containers/global/LoginRequired/LoginRequired';
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
  const USER_LOGGEDIN = useSelector(state => state.User.loggedIn);

  const USER = USER_AUTH.get();
  if(USER) {
    const infos = JSON.parse(USER);
    dispatch(setLoggedIn({
        id: infos.id,
        name: infos.name
    }))
  }

  const ONLY_USER = component => {
    if(USER_LOGGEDIN) return component;
    else return <Navigate to='/login' replace />;
  }

  return (
    <Routes>
      <Route element={ <MainView list={ true }/> }>
        <Route exact path="/"/>
        <Route exact path="/login" element={<LoginRequired />}/>
        <Route exact path="/user" element={ ONLY_USER(<UserMenuContainer />) } />
        <Route exact path="/user/recent" element={ ONLY_USER(<UserRecentContainer />) } />
        <Route exact path="/user/scrap" element={ ONLY_USER(<UserScrapContainer />) } />
        <Route exact path="/user/alarm" element={ ONLY_USER(<UserAlarmContainer />) } />
        <Route exact path="/user/info" element={ ONLY_USER(<UserInfoContainer />) } />
        <Route exact path="/news" element={ <NewsListContainer /> } />
        <Route exact path="/news/:id" element={ <NewsItemContainer /> } />
        <Route exact path="/register" element={ <RegisterContainer /> } />
        <Route exact path="/contact" element={ <ContactContainer /> } />
      </Route>
      <Route element={ <MainView list={ false }/> }>
        <Route exact path="/sales" element={ <SalesListContainer /> } />
        <Route exact path="/center/:id" element={ <CenterItemContainer /> } />
        <Route exact path="/recommend" element={ <RecommendListContainer /> } />
      </Route>
      <Route exact path="/terms" element={ <TermsContainer /> } />
    </Routes>
)};

export default App;

