import React from 'react';
import { Routes, Route } from 'react-router-dom';
// VIEWS
import MainListView from './views/Main/MainListView';
import MainItemView from './views/Main/MainItemView';
import NewsListView from './views/News/NewsListView';
import NewsItemView from './views/News/NewsItemView';
import SalesListView from './views/Sales/SalesListView';
import SalesItemView from './views/Sales/SalesItemView';
import RecommendListView from './views/Recommend/RecommendListView';
import RecommendItemView from './views/Recommend/RecommendItemView';
import RegisterView from './views/Register/RegisterView';
import ContactView from './views/Contact/ContactView';
import CalculatorView from './views/Calculator/CalculatorView';
import UserMenuView from './views/User/UserMenuView';
import UserInfoView from './views/User/UserInfoView';
import UserLatestView from './views/User/UserLatestView';
import UserLikesView from './views/User/UserLikesView';

const App = () => (
  <Routes>
    <Route path="/" element={ <MainListView /> } />
    <Route path="/building/:id" element={ <MainItemView /> } />

    <Route path="/news" element={ <NewsListView /> } />
    <Route path="/news/:id" element={ <NewsItemView /> } />

    <Route path="/sales" element={ <SalesListView /> } />
    <Route path="/sales/:id" element={ <SalesItemView /> } />

    <Route path="/recommend" element={ <RecommendListView /> } />
    <Route path="/recommend/:id" element={ <RecommendItemView /> } />

    <Route path="/user" element={ <UserMenuView /> } />
    <Route path="/user/infos" element={ <UserInfoView /> } />
    <Route path="/user/latest" element={ <UserLatestView /> } />
    <Route path="/user/Likes" element={ <UserLikesView /> } />

    <Route path="/register" element={ <RegisterView /> } />

    <Route path="/contact" element={ <ContactView /> } />

    <Route path="/calculator" element={ <CalculatorView /> } />
  </Routes>
);

export default App;

