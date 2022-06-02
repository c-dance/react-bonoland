import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMapZoom, updateMapRegion, updateMapLatlng, updateMapMarkers, updateMapInfoWindow } from '../../store/actions/map';
import { getRegionByLatlng, getRegionByZoom, removeMarkers, getSearchByAddress, renderedGroupMarker, getZoomLevel, renderItemMarkers, renderInfoWindow, removeInfoWindow } from '../../utils/map';
import { isBrowser } from 'react-device-detect';
import Map from '../../components/Map/Map';
import MapRegion from '../../components/MapRegion/MapRegion';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { naver } = window; 

const MapContainer = () => {
    /* === 지도, 지적편집도 === */
    const [ map, setMap ] = useState(null);
    const [ cadastralLayer, setCadastralLayer ] = useState(null);
    // let markers = [];
    /* === 지도 속성 === */
    const dispatch = useDispatch();
    const LATLNG = useSelector(state => state.Map.latlng);
    const ZOOM = useSelector(state => state.Map.zoom);
    const REGION = useSelector(state => state.Map.region);
    const MARKERS = useSelector(state => state.Map.markers);
    const INFO_WINDOW = useSelector(state => state.Map.infoWindow);
    const CADASTRAL_MODE = useSelector(state => state.Map.cadastral);
    const FILTERED = useSelector(state => state.Map.filtered);
    
   /* === 지도 생성 === */
    const initMap = () => {
        const nvMap = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(LATLNG[0], LATLNG[1]),
            zoom: ZOOM,
            minZoom: 7,
            zoomControl: isBrowser? true : false,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
                style: naver.maps.ZoomControlStyle.SMALL,
            },
            mapTypeControlOptions: {
                style: naver.maps.MapTypeControlStyle.BUTTON
            }
        });

        //event : zoom_changed, bounds_changed, deragend
        naver.maps.Event.addListener(nvMap, 'idle', () => { 
            updateMapByEvent(nvMap); 
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
    const updateMapByFilter = () => {
        if(!map) return;
        const point = new naver.maps.Point(LATLNG[0], LATLNG[1]);
        map.setCenter(point);
        map.setZoom(ZOOM, false);
    };

    //* === 지도 업데이트 (줌 변경 시 || 지역 이동 시) === */
    const updateMapByEvent = async (map) => {

        const zoom = map.getZoom(); // 줌 레벨(raw)
        const latlng = [map.getCenter()._lat, map.getCenter()._lng]; // 위경도
        const region = getRegionByZoom(await getRegionByLatlng(latlng), zoom); // 시도/구군/읍면동에 따른 주소

        if(LATLNG !== latlng) dispatch(updateMapLatlng(latlng));
        if(ZOOM !== zoom) dispatch(updateMapZoom(zoom));
        if(REGION !== region) dispatch(updateMapRegion(region));
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
            "ID" : "asdf265",
            "주소" :"경기 부천시 소삼로 38 101동 102호",
            "거래일" : "2022.01.02",
            "거래가": "100,000,000",
            "포화도": 7,
            "보노매물": false
        },
        {
            "ID" : "asdf2654",
            "주소" :"경기 부천시 경인옛로 25 104호",
            "거래일" : "2022.03.02",
            "거래가": "200,000,000",
            "포화도": 2,
            "보노매물": true
        },
        {
            "ID" : "asdf265",
            "주소" :"경기 부천시 소사동로 85",
            "거래일" : "2022.04.02",
            "거래가": "300,000,000",
            "포화도": 9,
            "보노매물": true
        },
        {
            "ID" : "asdf266",
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

    /* === 네이버 마커 설정  === */
    const updateMarkers = async () => {
        if(!map) return;

        const IS_DONG = getZoomLevel(ZOOM) === 3;
        const DATAS = IS_DONG? dongs : guguns;  
        
        if(DATAS.length > 0) {
            await getMarkersData(DATAS)
                .then(data => {
                    let mks = IS_DONG? 
                        renderItemMarkers(data, map, updateInfoWindow) 
                        : renderedGroupMarker(data, map, updateInfoWindow);
                    dispatch(updateMapMarkers(mks));
                })
        }
    };

    /* === 네이버 인포 윈도우 설정 === */
    const updateInfoWindow = (data, position) => {
        if(!map) return;
        
        const infoWindow = renderInfoWindow(data, position, map);
        dispatch(updateMapInfoWindow(infoWindow));
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
        updateMapByFilter();
    }, [FILTERED]);

    return (
        <>
            <Map />
            { isBrowser && <MapRegion region = { REGION } /> }
        </>
    )
};

export default MapContainer;