import { QuickLink, QuickBtn } from './QuickMenuStyle';

const QuickMenu = () => {
    return (
        <div>
            <QuickLink icon="user" display="pc" to="/user">마이페이지</QuickLink>
            <QuickLink icon="alarm" display="pc" to="/user/alarm">알람설정</QuickLink>
            <QuickLink icon="news" to="/news">뉴스</QuickLink>
            <QuickBtn icon="calc" display="mobile">수익계산기</QuickBtn>
        </div>
    )
}

export default QuickMenu;