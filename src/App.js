import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
// LAYOUT
import LayoutContainer from './containers/Layout/LayoutContainer';
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

import MapChartContainer from './containers/MapChart/MapChartContainer';
import MapContainer from './containers/Map/MapContainer';


// BASE LAYOUT : NAVIGATION & MAP & CENTER LIST
const RootContainer = ({ map, list }) => (
  <LayoutContainer>
      { list && <CenterListContainer /> } 
      <MapContainer />
      <MapChartContainer />
      <Outlet />
  </LayoutContainer>
);

const App = () => (
    <Routes>
      <Route element={ <RootContainer list={ true }/> }>
        <Route exact path="/"/>
        <Route exact path="/news" element={ <NewsListContainer /> } />
        <Route exact path="/news/:id" element={ <NewsItemContainer /> } />
        <Route exact path="/user" element={ <UserMenuContainer /> } />
        <Route exact path="/user/recent" element={ <UserRecentContainer /> } />
        <Route exact path="/user/scrap" element={ <UserScrapContainer /> } />
        <Route exact path="/user/alarm" element={ <UserAlarmContainer /> } />
        <Route exact path="/user/info" element={ <UserInfoContainer /> } />
        <Route exact path="/register" element={ <RegisterContainer /> } />
        <Route exact path="/contact" element={ <ContactContainer /> } />
      </Route>
      <Route element={ <RootContainer list={ false }/> }>
        <Route exact path="/sales" element={ <SalesListContainer /> } />
        <Route exact path="/center/:id" element={ <CenterItemContainer /> } />
        <Route exact path="/recommend" element={ <RecommendListContainer /> } />
      </Route>
      <Route exact path="/terms" element={ <TermsContainer /> } />
    </Routes>
);

export default App;

