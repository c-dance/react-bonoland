import { TabBar, TabBtn } from './MobileTabBarStyle';

const MobileTabBar = () => {
    return (
        <TabBar>
            <ul>
                <li><TabBtn icon="sales" to="/sales">시설매매</TabBtn></li>
                <li><TabBtn icon="rcmd" to="/recommend">추천매물</TabBtn></li>
                <li><TabBtn icon="register" to="/register">매물접수</TabBtn></li>
                <li><TabBtn icon="contact" to="/contact">매수문의</TabBtn></li>
                <li><TabBtn icon="user" to="/user">마이페이지</TabBtn></li>
            </ul>
        </TabBar>
    )
}

export default MobileTabBar;