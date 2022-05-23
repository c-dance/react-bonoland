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
import CenterListContainer from '../../containers/Center/CenterListContainer';
import Panel from '../../components/ui/Panel/Panel';
// import MapContainer from '../../containers/Map/MapContainer';

const CenterListView = () => (
    <div>
        <Panel
            type={ "floating" }
            position={ "left" }
            fold={ true }
        >
            <CenterListContainer />
        </Panel>
        {/* <MapContainer /> */}
    </div>
);

export default CenterListView;
