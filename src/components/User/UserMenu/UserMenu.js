import { Menus, Logout } from './UserMenuStyle';
import { Link } from 'react-router-dom';

const UserMenu = () => {
    return (
        <Menus>
            <Link to="/user/info">회원 정보 변경</Link>
            <Link to="/user/scrap">찜 매물</Link>
            <Link to="/user/recent">최근 본 매물</Link>
            <Link to="/terms">약관 정책</Link>
            <Logout>로그아웃</Logout>
        </Menus>
    )
}

export default UserMenu;