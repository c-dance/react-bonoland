import React from "react";
import { TabBar, TabLink, TabBtn } from './MobileTabBarStyle';
import { useDispatch, useSelector } from 'react-redux';
import { activateLogin, activateContact, activateRegister } from '../../../store/actions/service'

const MobileTabBar = () => {

    const dispatch = useDispatch();
    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    return (
        <TabBar>
            <ul>
                <li><TabLink icon="sales" to="/sales">시설매매</TabLink></li>
                <li><TabLink icon="rcmd" to="/recommend">추천매물</TabLink></li>
                <li><TabBtn icon="register" onClick={() => { dispatch(activateRegister()) }}>매물접수</TabBtn></li>
                <li><TabBtn icon="contact" onClick={() => { dispatch(activateContact()) }}>매수문의</TabBtn></li>
                { IS_LOGGEDIN && <li><TabLink icon="user" to="/user">마이페이지</TabLink></li>}
                { !IS_LOGGEDIN && <li><TabBtn icon="user" onClick={ () => { dispatch(activateLogin()) } }>로그인</TabBtn></li>}
            </ul>
        </TabBar>
    )
}

export default MobileTabBar;