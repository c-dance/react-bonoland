import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
//
import LayoutContainer from './containers/Layout/LayoutContainer';
// VIEWS
import MainListView from './views/Main/MainListView';
import MainItemView from './views/Main/MainItemView';
import SalesListView from './views/Sales/SalesListView';
import SalesItemView from './views/Sales/SalesItemView';
import RecommendListView from './views/Recommend/RecommendListView';
import RecommendItemView from './views/Recommend/RecommendItemView';
import NewsListView from './views/News/NewsListView';
import NewsItemView from './views/News/NewsItemView';

import UserMenuContainer from './containers/User/UserMenuContainer';
import UserRecentContainer from './containers/User/UserRecentContainer';
import UserScrapContainer from './containers/User/UserScrapContainer';
import UserAlarmContainer from './containers/User/UserAlarmContainer';
import UserInfoContainer from './containers/User/UserInfoContainer';

// import RegisterView from './views/Register/RegisterView';
// import ContactView from './views/Contact/ContactView';
// import CalculatorView from './views/Calculator/CalculatorView';

const BaseView = ({ map, list }) => (
  <LayoutContainer>
      { list && <MainListView /> } 
      <Outlet />
  </LayoutContainer>
);

const App = () => (
    <Routes>
      <Route element={ <BaseView list={ true } /> }>
        <Route exact path="/"/>
        <Route exact path="/news" element={ <NewsListView /> } />
        <Route exact path="/news/:id" element={ <NewsItemView /> } />
        <Route exact path="/user" element={ <UserMenuContainer /> } />
        <Route exact path="/user/recent" element={ <UserRecentContainer /> } />
        <Route exact path="/user/scrap" element={ <UserScrapContainer /> } />
        <Route exact path="/user/alarm" element={ <UserAlarmContainer /> } />
        <Route exact path="/user/info" element={ <UserInfoContainer /> } />
      </Route>
      <Route element={ <BaseView list={ false } /> }>
        <Route exact path="/sales" element={ <SalesListView /> } />
        <Route exact path="/center/:id" element={ <MainItemView /> } />
        <Route exact path="/recommend" element={ <RecommendListView /> } />
      </Route>
      {/* <Route exact path="/sales/:id" element={ <SalesItemView /> } /> */}
      {/* <Route exact path="/recommend/:id" element={ <RecommendItemView /> } /> */}


      {/* <Route exact path="/register" element={ <RegisterView /> } /> */}
      {/* <Route exact path="/contact" element={ <ContactView /> } /> */}
      {/* <Route exact path="/calculator" element={ <CalculatorView /> } /> */}
    </Routes>
);

export default App;

