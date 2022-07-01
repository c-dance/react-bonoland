import React from "react";
import { Menus, Logout } from './UserMenuStyle';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { logout } from '../../../store/actions/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { activateMyAlarm, activateMyInfo, activateMyRecent, activateMyScrap } from "../../../store/actions/page";

const UserMenu = () => {
    const dispatch = useDispatch();

    return (
        <Menus>
            <button onClick={ () => dispatch(activateMyInfo()) }>회원 정보 변경</button>
            <button onClick={ () => dispatch(activateMyScrap()) }>찜 매물</button>
            <button onClick={ () => dispatch(activateMyRecent()) }>최근 본 매물</button>
            <button onClick={ () => dispatch(activateMyAlarm()) }>알림 매물</button>
            <Link target="_blank" to="/terms">약관 정책</Link>
            <Logout 
                className={ isMobile && "mobile" } 
                onClick={ () => dispatch(logout()) }
            >로그아웃</Logout>
        </Menus>
    )
}

export default UserMenu;