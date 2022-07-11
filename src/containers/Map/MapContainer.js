import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { 
    initMap,
    updateMapInfos,
    updateMapFilter,
    clearMapOverlay,
    updateMapMarkers, 
    updateMapInfoWindow,
    updateDataLayer,
    clearDataLayer, 
} from '../../store/actions/map';
import { updateFilter } from '../../store/actions/filter';
import { 
    getRegionByLatlng, 
    getRegionByZoom, 
    renderedGroupMarker, 
    getZoomLevel, 
    renderItemMarkers, 
    renderInfoWindow, 
    removeInfoWindow,
    getGeoJson,
    renderDataLayer
} from '../../utils/map';
import { isBrowser, isMobile } from 'react-device-detect';
import Map from '../../components/Map/Map';
import MapRegion from '../../components/MapRegion/MapRegion';
import InfoWindow from '../../components/ui/InfoWindow/InfoWindow';
import { activateAlert } from '../../store/actions/alert';
import { activateContact } from '../../store/actions/service';
import { getMapMarkers } from '../../api/map';
import { updateChart } from '../../store/actions/chart';
import { GET_MARKETS } from '../../scheme/chart';

const localStatistics = {
    localStatisticsNo : 1,
    siDoCd : "서울특별시",
    siGunGuCd : "강서구",
    highAgeManCnt : 50,
    highAgeWomanCnt :  70,
    ratingManCnt : 60,
    ratingWomanCnt : 30,
    onlyTotal : 2,
    mallTotal : 3,
    centerTotal : 2,
    totalPer : 306,
    currentPer : 153,
    usePercent : 50
}

const dongs = [
    {
        "ID" : 0,
        "주소" :"경기 부천시 소삼로 38 101동 102호",
        "거래일" : "2022.01.02",
        "거래가": "100,000,000",
        "포화도": 7,
        "보노매물": false,
        "latlng":  ['126.7970470', '37.4782160']
    },
    {
        "ID" : 1,
        "주소" :"경기 부천시 경인옛로 25 104호",
        "거래일" : "2022.03.02",
        "거래가": "200,000,000",
        "포화도": 2,
        "보노매물": true,
        "latlng":  ['126.7951166', '37.4816231']
    },
    {
        "ID" : 2,
        "주소" :"경기 부천시 소사동로 85",
        "거래일" : "2022.04.02",
        "거래가": "300,000,000",
        "포화도": 9,
        "보노매물": true,
        "latlng":  ['126.8039843', '37.4738793']
    },
    {
        "ID" : 3,
        "주소" :"경기 부천시 은성로62번길 13 백암빌딩 101호",
        "거래일" : "2022.05.02",
        "거래가": "500,000,000",
        "포화도": 5,
        "보노매물": false,
        "latlng":  ['126.7976639', '37.4747131']
    }
];

const { naver } = window; 

const MapContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* === 지도, 지적편집도 === */
    const [ map, setMap ] = useState(null);
    const [ cadastralLayer, setCadastralLayer ] = useState(null);
    const [ mobileInfoWindow, setMobileInfoWindow ] = useState(false);
    const [ infoWindowData, setInfoWindowData ] = useState(null);
    const [ alertMsg, setAlertMsg ] = useState(null);
    
    /* === 지도 속성 === */
    const MAP_INFOS = useSelector(state => state.Map.infos);
    const MAP_FILTER = useSelector(state => state.Map.filter); // 맵 필터링
    const INFO_WINDOW = useSelector(state => state.Map.infoWindow); // 인포윈도우 객체
    const CADASTRAL_MODE = useSelector(state => state.Map.cadastral); // 지적도 모드
    const MAP_DATA_LAYER = useSelector(state => state.Map.dataLayer);

    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

   /* === 지도 생성 === */
    const NAVER_MAP = () => {
        const nvMap = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(MAP_INFOS.latlng[0], MAP_INFOS.latlng[1]),
            zoom: MAP_INFOS.zoom,
            // mapTypeId: naver.maps.MapTypeId.NORMAL,
        });

        // 레이어 스타일 설정
        nvMap.data.setStyle({ strokeColor: '#2962FF', fillColor: 'rgba(41, 98, 255, .3)' });

        // 줌버튼 생성
        naver.maps.Event.once(nvMap, 'init', function() {
            const zoonInButton = "<button class='mapZoom mapZoom--in'></button>";
            const zoonOutButton = "<button class='mapZoom mapZoom--out'></button>";

            const zoomIn = new naver.maps.CustomControl(zoonInButton);
            const zoomOut = new naver.maps.CustomControl(zoonOutButton);
            zoomIn.setMap(nvMap);
            zoomOut.setMap(nvMap);
        
            naver.maps.Event.addDOMListener(zoomIn.getElement(), 'click', function() {
                nvMap.setZoom(nvMap.getZoom() + 1, true);
            });
            naver.maps.Event.addDOMListener(zoomOut.getElement(), 'click', function() {
                nvMap.setZoom(nvMap.getZoom() - 1, true);
            });
        });

        // 지도 이벤트 : zoom_changed, bounds_changed, deragend, idle
        naver.maps.Event.addListener(nvMap, 'idle', () => { 
            updateMapDatas(nvMap);
            alertZoomLevel(nvMap.getZoom()); 
        });
        
        naver.maps.Event.addListener(nvMap, 'zoom_changed', () => { 
            dispatch(clearMapOverlay());
        });

        // 지적편집도 설정
        const cadastralLayer = new naver.maps.CadastralLayer();
        naver.maps.Event.once(nvMap, 'init', () => { 
            cadastralLayer.setMap(CADASTRAL_MODE? true : null); 
        });

        setMap(nvMap);
        setCadastralLayer(cadastralLayer);

        return nvMap;
    };

    /* === 지적 편집도 설정 === */
    const toggleCadastralMode = active => {
        if(!map || !cadastralLayer) return;

        if(active) cadastralLayer.setMap(map);
        else cadastralLayer.setMap(null);
    };

    /* === 지도 위치 변경 (검색 필터 적용 시) === */
    const resetMapByFilter = mapProps => {
        if(!map) return;
        if(mapProps.latlng.length === 2 && mapProps.zoom !== null) {
            const point = new naver.maps.Point(mapProps.latlng[1], mapProps.latlng[0]);
            map.morph(point, mapProps.zoom, "easeOutCubic");
        }
    };

    /* === 지도 데이터 업데이트 (지도 이벤트 발생 시) === */
    const updateMapDatas = async (map) => {
        const zoom = map.getZoom(); // 줌 레벨(raw)
        const latlng = [map.getCenter()._lat, map.getCenter()._lng]; // 위경도
        const region = getRegionByZoom(await getRegionByLatlng(latlng), zoom); // 시도/구군/읍면동에 따른 주소
        // save map info
        dispatch(updateMapInfos({ latlng: latlng, zoom: zoom, region: region }));
        updateMarkers(map, { latlng: latlng, zoom: zoom, region: region });
    };

    /* === 최소 줌 레벨 경고 === */
    const alertZoomLevel = zoomLevel => {
        if(zoomLevel < 8) dispatch(activateAlert({ title: '', contents: '지도를 확대해 주세요' }));
    };

    const showMobileInfoWindow = (data) => {
        setInfoWindowData(data);
        setMobileInfoWindow(true);
    };

    const closeInfoWindow = () => {
        removeInfoWindow(INFO_WINDOW);
        if(isMobile) {
            setInfoWindowData(null);
            setMobileInfoWindow(false);
        }
    };  

    const onContactClick = centerId => {
        console.log(centerId);
        if(IS_LOGGEDIN) {
            // 데이터 함께 전달
            dispatch(activateContact());
        } else {
            dispatch(activateAlert({
                title: "비회원 매수문의", 
                contents: "비회원은 상단 매수문의를 통해서 문의. (문구 수정 예정)"
            }))
        }
    };

    const onDetailsClick = centerId => {
        console.log( '상세 클릭', centerId);
        navigate(`/center/${centerId}`);
    };

    /* === 인포윈도우 활성화 === */
    const updateInfoWindow = centerId => {
        if(!map) return; 

        let idata = dongs[centerId];
        
        /* === 네이버 인포 윈도우 옵션 설정 === */
        const infoWindowOption = {
            data: idata,
            map: map,
            onCloseClick: closeInfoWindow,
            onContactClick: onContactClick,
            onDetailsClick: onDetailsClick
        };
        
        dispatch(updateMapInfoWindow(renderInfoWindow(infoWindowOption)));

        if(isMobile) showMobileInfoWindow(idata);
    };

    /* === 그룹 마커 클릭 === */
    const onGroupMarkerClick = props => {
        dispatch(updateMapFilter({ latlng: props.latlng, zoom: props.zoom }));
        dispatch(updateFilter({ latlng: props.latlng, zoom: props.zoom }));    
    };

    /* === 아이템 마커 클릭 === */
    const onItemMarkerClick = (latlng, itemId) => {
        // if(isMobile) {
        //     dispatch(updateMapFilter({
        //         latlng: latlng
        //     }));
        // }
        // 아이템 아이디 넘기기

        updateInfoWindow(itemId);
    };

    
    /* === 네이버 마커 설정 === */
    const updateMarkers = async (map, option) => {
        const ITEM_MARKER = getZoomLevel(option.zoom) === 'dong';
        const RESPONSE = await getMapMarkers({ x: option.latlng[0], y: option.latlng[1], zoom: option.zoom, page: 1 });

        console.log('마커 데이터 요청');
        setAlertMsg(null);
        if(RESPONSE && RESPONSE.data.code === 1) {
            console.log('마커 데이터 받아옴', RESPONSE.data.arrayResult);
            const mks = ITEM_MARKER? 
                renderItemMarkers(RESPONSE.data.arrayResult, map, onItemMarkerClick) 
                : renderedGroupMarker(RESPONSE.data.arrayResult, map, onGroupMarkerClick);

            dispatch(updateMapMarkers(mks));

            // if(RESPONSE.data.localStatistics) dispatch(updateChart(GET_MARKETS(RESPONSE.data.localStatistics)));
            dispatch(updateChart(GET_MARKETS(localStatistics)));
        } else {
            console.log('마커 데이터 없음');
            dispatch(clearMapOverlay());
            if(map.zoom < 8) dispatch(activateAlert({ title: '', contents: '지도를 확대해 주세요' }));
            else setAlertMsg(`${option.region? option.region+ ' ' : ''}매물이 없습니다.`);
        }
    };

    // 검색했을 때 영역 그려주기
    const drawBoundary = async (zoom, address) => {
        const res = await getGeoJson(zoom, address);
        console.log(res);
    };

    useEffect(()=> {
       const map = NAVER_MAP();
       dispatch(initMap(map));
       updateMarkers(map, MAP_INFOS);
    }, []);
    
    useEffect(() => {
        resetMapByFilter(MAP_FILTER); 
    }, [MAP_FILTER.zoom, MAP_FILTER.latlng]);

    useEffect(() => {
        if(MAP_FILTER.geoAddress.length > 0) {
            drawBoundary(MAP_FILTER.zoom, MAP_FILTER.geoAddress);
        }
    }, [MAP_FILTER.geoAddress])


    useEffect(() => {
        toggleCadastralMode(CADASTRAL_MODE);
    }, [CADASTRAL_MODE]);

    return (
        <>
            <Map />

            { alertMsg && <div className="map-alert">{ alertMsg }</div>}
            { 
                isBrowser && 
                <MapRegion region = { MAP_INFOS.region } /> 
            }
            { 
                isMobile && mobileInfoWindow && 
                <InfoWindow 
                    data={ infoWindowData } 
                    onCloseClick={ closeInfoWindow } 
                    onContactClick = { onContactClick }    
                /> 
            }
        </>
    )
};

export default MapContainer;