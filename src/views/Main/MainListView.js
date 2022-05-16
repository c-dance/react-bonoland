/*
- 맵
- 퀵메뉴 
- 빌딩목록
- 검색 영역
- 카테고리 필터 영역
- 라우터 영역
- 유저 퀵메뉴
- 지도툴
- 유틸 퀵메뉴

*/

import MapContainer from '../../containers/Map/MapContainer';
import GlobalHeaderContainer from '../../containers/global/GlobalHeader/GlobalHeaderContainer';
// import QuickUserMenuContainer from '../../containers/global/QuickUserMenu/QuickUserMenuContainer';
import QuickUtilMenuContainer from '../../containers/global/QuickUtilMenu/QuickUtilMenuContainer';
import MobileTabBarContainer from '../../containers/global/MobileTabBar/MobileTabBarContainer';
import SideContaier from '../../containers/Side/SideContainer';
import MainListContainer from '../../containers/Main/MainListContainer';

const MainListView = () => (
    <div>
        <GlobalHeaderContainer />
        <MobileTabBarContainer />
        <QuickUtilMenuContainer />
        {/* <SideContaier /> */}
        <MainListContainer />
        {/* <MapContainer /> */}
    </div>
);

export default MainListView;
