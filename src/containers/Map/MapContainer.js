import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    updateMapZoom, 
    updateMapRegion, 
    updateMapLatlng, 
    updateMapMarkers, 
    updateMapInfoWindow, 
    updateMapFilter 
} from '../../store/actions/map';
import { 
    getRegionByLatlng, 
    getRegionByZoom, 
    removeMarkers, 
    getSearchByAddress, 
    renderedGroupMarker, 
    getZoomLevel, 
    renderItemMarkers, 
    renderInfoWindow, 
    removeInfoWindow 
} from '../../utils/map';
import { isBrowser, isMobile } from 'react-device-detect';
import Map from '../../components/Map/Map';
import MapRegion from '../../components/MapRegion/MapRegion';
import InfoWindow from '../../components/ui/InfoWindow/InfoWindow';
import { activateAlert } from '../../store/actions/alert';

const { naver } = window; 

const MapContainer = () => {
    /* === 지도, 지적편집도 === */
    const [ map, setMap ] = useState(null);
    const [ cadastralLayer, setCadastralLayer ] = useState(null);
    const [ mobileInfoWindow, setMobileInfoWindow ] = useState(false);
    const [ infoWindowData, setInfoWindowData ] = useState(null);

    /* === 지도 속성 === */
    const dispatch = useDispatch();
    const LATLNG = useSelector(state => state.Map.latlng); //위경도
    const ZOOM = useSelector(state => state.Map.zoom); // 줌
    const REGION = useSelector(state => state.Map.region); // 지역
    const MARKERS = useSelector(state => state.Map.markers); // 마커 목록
    const INFO_WINDOW = useSelector(state => state.Map.infoWindow); // 인포윈도우 객체
    const CADASTRAL_MODE = useSelector(state => state.Map.cadastral); // 지적도 모드
    const FILTERED = useSelector(state => state.Map.filtered); // 필터링 여부

   /* === 지도 생성 === */
    const initMap = () => {
        const nvMap = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(LATLNG[0], LATLNG[1]),
            zoom: ZOOM,
            minZoom: 9,
            maxZoom: 16,
            mapTypeId: naver.maps.MapTypeId.NORMAL,
        });

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

        // 지도 이벤트 : zoom_changed, bounds_changed, deragend
        naver.maps.Event.addListener(nvMap, 'idle', () => { 
            updateMapDatas(nvMap);
            alertZoomLevel(nvMap.getZoom()); 
        });

        // 지적편집도 설정
        const cadastralLayer = new naver.maps.CadastralLayer();
        naver.maps.Event.once(nvMap, 'init', () => { 
            cadastralLayer.setMap(CADASTRAL_MODE? true : null); 
        });

        setMap(nvMap);
        setCadastralLayer(cadastralLayer);
    };

    /* === 지적 편집도 설정 === */
    const toggleCadastralMode = active => {
        if(!map || !cadastralLayer) return;

        if(active) cadastralLayer.setMap(map);
        else cadastralLayer.setMap(null);
    };

    /* === 지도 위치 변경 (검색 필터 적용 시) === */
    const resetMapPoint = () => {
        const point = new naver.maps.Point(LATLNG[0], LATLNG[1]);
        if(map && point) {
            map.morph(point, ZOOM, "easeOutCubic");
        }
    };

    /* === 지도 데이터 업데이트 (지도 이벤트 발생 시) === */
    const updateMapDatas = async (map) => {
        const zoom = map.getZoom(); // 줌 레벨(raw)
        const latlng = [map.getCenter()._lat, map.getCenter()._lng]; // 위경도
        const region = getRegionByZoom(await getRegionByLatlng(latlng), zoom); // 시도/구군/읍면동에 따른 주소

        dispatch(updateMapLatlng(latlng));
        dispatch(updateMapZoom(zoom));
        dispatch(updateMapRegion(region));
    };

    /* === 최소 줌 레벨 경고 === */
    const alertZoomLevel = zoomLevel => {
        if(zoomLevel < 11) {
            dispatch(activateAlert({
                title:"",
                contents: "지도를 확대해 주세요"
            }))
        }
    };

    const guguns = [
        {
            "주소": "범안동",
            "요양원": 7,
            "주간보호": 9
        },
        {
            "주소": "향동",
            "요양원": 10,
            "주간보호": 11
        }, 
        {
            "주소": "대산동",
            "요양원": 14,
            "주간보호": 8
        }, 
        {
            "주소": "신월 7동",
            "요양원": 8,
            "주간보호": 4
        }
    ];

    const dongs = [
        {
            "ID" : 0,
            "주소" :"경기 부천시 소삼로 38 101동 102호",
            "거래일" : "2022.01.02",
            "거래가": "100,000,000",
            "포화도": 7,
            "보노매물": false
        },
        {
            "ID" : 1,
            "주소" :"경기 부천시 경인옛로 25 104호",
            "거래일" : "2022.03.02",
            "거래가": "200,000,000",
            "포화도": 2,
            "보노매물": true
        },
        {
            "ID" : 2,
            "주소" :"경기 부천시 소사동로 85",
            "거래일" : "2022.04.02",
            "거래가": "300,000,000",
            "포화도": 9,
            "보노매물": true
        },
        {
            "ID" : 3,
            "주소" :"경기 부천시 은성로62번길 13 백암빌딩 101호",
            "거래일" : "2022.05.02",
            "거래가": "500,000,000",
            "포화도": 5,
            "보노매물": false
        }
    ]

    /* === 마커 데이터 준비 (with latlng) === */
    const getMarkersData = async data => {

        const dataWithLatlng = (await Promise.all(
            data.map(item => {
                return getSearchByAddress(item["주소"]);
            })
        )).reduce((res, value, idx) =>{
            const dt = data[idx];
            if(value.latlng){
                dt.latlng = value.latlng;
                return res.concat([dt]);
            } 
        }, []);

        return dataWithLatlng;
    };

    /* === 인포 윈도우 문의하기 === */
    const alertMsg = {
        title: "비회원 매수문의",
        contents: "비회원은 따로 문의"
    };

    const closeInfoWindow = () => {
        removeInfoWindow(INFO_WINDOW);
    };  

    const onContactClick = () => {
        dispatch(activateAlert(alertMsg));
    };

    /* === 모바일 인포윈도우 보이기 === */
    const showMobileInfoWindow = (data) => {
        setInfoWindowData(data);
        setMobileInfoWindow(true);
    };

    /* === 모바일 인포윈도우 닫기 === */
    const clsoeMobileInfoWindow = () => {
        removeInfoWindow(INFO_WINDOW);
        setInfoWindowData(null);
        setMobileInfoWindow(false);
    };

    /* === 인포윈도우 활성화 === */
    const updateInfoWindow = centerId => {
        if(!map) return; 

        let idata = dongs[centerId];
        
        /* === 네이버 인포 윈도우 설정 === */
        const infoWindowOption = {
            data: idata,
            map: map,
            onCloseClick: isMobile? 
                clsoeMobileInfoWindow 
                :closeInfoWindow,
            onContactClick: onContactClick,
        };
        
        dispatch(updateMapInfoWindow(renderInfoWindow(infoWindowOption)));

        if(isMobile) showMobileInfoWindow(idata);
    };

    /* === 그룹 마커 클릭 === */
    const onGroupMarkerClick = (latlng) => {

        const level = getZoomLevel(ZOOM);
        const nZoom = level <= 1 ? 14 : 16;

        dispatch(updateMapFilter({
            latlng: latlng,
            zoom: nZoom
        }));

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
    const updateMarkers = async () => {
        if(!map) return;

        const IS_DONG = getZoomLevel(ZOOM) === 3;
        const DATAS = IS_DONG? dongs : guguns;  
        
        if(DATAS.length > 0) {
            await getMarkersData(DATAS)
                .then(data => {
                    let mks = IS_DONG? 
                        renderItemMarkers(data, map, onItemMarkerClick) 
                        : renderedGroupMarker(data, map, onGroupMarkerClick);
                    dispatch(updateMapMarkers(mks));
                })
        }
    };

    useEffect(()=> {
        initMap();
    }, []);

    useEffect(() => {
        updateMarkers();
        // return () => {
        //     removeMarkers(MARKERS);
        //     removeInfoWindow(INFO_WINDOW);
        // }
        alertZoomLevel(ZOOM);
    }, [LATLNG, ZOOM]);
    
    useEffect(() => {
        return () => {
            removeInfoWindow(INFO_WINDOW);
            removeMarkers(MARKERS);
        }
    }, [MARKERS]);
    
    useEffect(() => {
        return () => {
            removeInfoWindow(INFO_WINDOW);
        }
    }, [INFO_WINDOW]);

    useEffect(() => {
        toggleCadastralMode(CADASTRAL_MODE);
    }, [CADASTRAL_MODE]);

    useEffect(() => {
        resetMapPoint(LATLNG);
    }, [FILTERED]);

    return (
        <>
            <Map />
            { 
                isBrowser && 
                <MapRegion region = { REGION } /> 
            }
            { 
                isMobile && mobileInfoWindow && 
                <InfoWindow 
                    data={ infoWindowData } 
                    onCloseClick={ clsoeMobileInfoWindow } 
                    onContactClick = { onContactClick }    
                /> 
            }
        </>
    )
};

export default MapContainer;