import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMapZoom, updateMapRegion, updateMapLatlng, updateMapMarkers } from '../../store/actions/map';
import { getRegionByLatlng, getRegionByZoom, removeMarkers, getSearchByAddress, renderedGroupMarker } from '../../utils/map';
import { isBrowser } from 'react-device-detect';
import Map from '../../components/Map/Map';
import MapRegion from '../../components/MapRegion/MapRegion';
import { fireEvent } from '@testing-library/react';

const { naver } = window; 

const MapContainer = () => {
    /* === 지도, 지적편집도 === */
    const [ map, setMap ] = useState(null);
    const [ cadastralLayer, setCadastralLayer ] = useState(null);
    const [ markers, setMarkers ] = useState([]);
    /* === 지도 속성 === */
    const dispatch = useDispatch();
    const LATLNG = useSelector(state => state.Map.latlng);
    const ZOOM = useSelector(state => state.Map.zoom);
    const REGION = useSelector(state => state.Map.region);
    // const MARKERS = useSelector(state => state.Map.markers);
    const CADASTRAL_MODE = useSelector(state => state.Map.cadastral);
    const FILTERED = useSelector(state => state.Map.filtered);
    
   /* === 지도 생성 === */
    const initMap = () => {
        const map = new naver.maps.Map('map', {
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

        // 줌레벨, 지역 변경 이벤트 설정
        naver.maps.Event.addListener(map, 'zoom_changed', () => { updateMapByEvent(map); });
        naver.maps.Event.addListener(map, 'bounds_changed', () => { updateMapByEvent(map); });

        // 지적편집도 설정
        const cadastralLayer = new naver.maps.CadastralLayer();
        naver.maps.Event.once(map, 'init', () => { cadastralLayer.setMap(CADASTRAL_MODE? true : null); });

        setMap(map);
        setCadastralLayer(cadastralLayer);
    };

    /* === 지적 편집도 설정 === */
    const toggleCadastralMode = active => {
        if(!map || !cadastralLayer) return;

        if(active) cadastralLayer.setMap(map);
        else cadastralLayer.setMap(null);
    };

    /* === 지도 위치 변경 === */
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

    const guguns = {
        "성곡동" : {
            "요양원": 7,
            "주간보호": 9
        },
        "향동" : {
            "요양원": 10,
            "주간보호": 11
        }, 
        "대산동" : {
            "요양원": 14,
            "주간보호": 8
        }, 
        "신월 7동" : {
            "요양원": 8,
            "주간보호": 4
        }
    };


    // 마커 업데이트
    const updateMarkers = () => {
        if(!map) return;

        console.log(markers);

        removeMarkers(markers);

        Object.keys(guguns).map(async key => {
            await getSearchByAddress(key)
                .then(res => {
                    guguns[key].latlng = res.latlng;
                    let nMarkers = [...markers, renderedGroupMarker(guguns[key])];
                    setMarkers(nMarkers);
                    console.log(markers);
                })
                .catch(err => {
                    console.log(err);
                })
        });
    };

    useEffect(()=> {
        initMap();
        
    }, []);

    useEffect(() => {
        updateMarkers();
    }, [LATLNG, ZOOM]);

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