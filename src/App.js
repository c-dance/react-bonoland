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

// TERMS
import TermsContainer from './containers/Terrms/TermsContainer';
import MainView from './view/MainView';

import TestContainer from './containers/TestContainer'


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
      <Route element={ <MainView list={ false }/> }>
          <Route exact path="/" element={ <CenterListContainer /> }/>
          <Route exact path="/sales/:category" element={ <RecommendListContainer /> } />
          <Route exact path="/recommend/:category" element={ <RecommendListContainer /> } />
          <Route exact path="/center/:id" element={ <CenterItemContainer /> } />
      </Route>
      <Route exact path="/terms" element={ <TermsContainer /> } />
      <Route exact path="/terms/:category" element={ <TermsContainer /> } />
      <Route exact path="/test" element={ <TestContainer /> } />
    </Routes>
)};

export default App;

