import React from 'react';
import { Routes, Route } from 'react-router-dom';
// VIEWS
import MainListView from './views/Main/MainListView';
// import MainItemView from './views/Main/MainItemView';
// import NewsListView from './views/News/NewsListView';
// import NewsItemView from './views/News/NewsItemView';
// import SalesListView from './views/Sales/SalesListView';
// import SalesItemView from './views/Sales/SalesItemView';
// import RecommendListView from './views/Recommend/RecommendListView';
// import RecommendItemView from './views/Recommend/RecommendItemView';
// import RegisterView from './views/Register/RegisterView';
// import ContactView from './views/Contact/ContactView';
// import CalculatorView from './views/Calculator/CalculatorView';
// import UserMenuView from './views/User/UserMenuView';
// import UserInfoView from './views/User/UserInfoView';
// import UserLatestView from './views/User/UserLatestView';
// import UserLikesView from './views/User/UserLikesView';

const App = () => (
  
  <Routes>
    <Route exact path="/" element={ <MainListView /> } />
    {/* <Route exact path="/center/:id" element={ <MainItemView /> } />

    <Route exact path="/news" element={ <NewsListView /> } />
    <Route exact path="/news/:id" element={ <NewsItemView /> } />

    <Route exact path="/sales" element={ <SalesListView /> } />
    <Route exact path="/sales/:id" element={ <SalesItemView /> } />

    <Route exact path="/recommend" element={ <RecommendListView /> } />
    <Route exact path="/recommend/:id" element={ <RecommendItemView /> } />

    <Route exact path="/user" element={ <UserMenuView /> } />
    <Route exact path="/user/infos" element={ <UserInfoView /> } />
    <Route exact path="/user/latest" element={ <UserLatestView /> } />
    <Route exact path="/user/Likes" element={ <UserLikesView /> } />

    <Route exact path="/register" element={ <RegisterView /> } />

    <Route exact path="/contact" element={ <ContactView /> } />

    <Route exact path="/calculator" element={ <CalculatorView /> } /> */}
  </Routes>
);

export default App;

