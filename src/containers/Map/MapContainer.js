import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMapProps } from '../../store/actions';
import Map from '../../components/Map/Map';
import MapChart from '../../components/MapChart/MapChart';
import MapRegion from '../../components/MapRegion/MapRegion';

// 차트, 주소, 맵 분리 필요

const MapContainer = () => {
    const mapProps = useSelector(state => state.Map);
    const dispatch = useDispatch();
    const [ chart, setChart ] = useState(null);

    const { naver } = window; 

    // (1) 지도 생성
    const initMap = () => {
        const map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(mapProps.latlng[0], mapProps.latlng[1]),
            zoom: mapProps.zoom,
            minZoom: 7,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
                style: naver.maps.ZoomControlStyle.SMALL,
            }
        });

        naver.maps.Event.addListener(map, 'zoom_changed', () => { resetMap(map) });
        naver.maps.Event.addListener(map, 'bounds_changed', () => { resetMap(map) });
    };

    // (2) 지도 업데이트
    const resetMap = async (map) => {
        const zoom = map.getZoom();
        const latlng = [map.getCenter()._lat, map.getCenter()._lng];
        const region = getRegion(await fetchReverseGeocode(latlng), zoom);

        resetMapProps(latlng, zoom, region);
        resetCharts(region, zoom);  
        // resetMarkers();
    };

    // 스토어 업데이트
    const resetMapProps = (latlng = mapProps.latlng, zoom = mapProps.zoom, region = '') => {
        let props = {
            latlng: latlng,
            zoom: zoom ,
            region: region
        }
        dispatch(updateMapProps(props));
    };

    // 차트 데이터 갱신
    const resetCharts = async (region, zoom) => {
        let data = null;
        if(zoom < 16 && zoom >= 14) {
            data = await fetchChart(region);
            console.log(data);
            setChart(data);
        } 
        setChart(data);
    };

    // (3) 차트 데이터
    const fetchChart = (region) => {

        const datas = {
            old: {
                total: 300
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                resolve(datas);
            }, 1000);
        })
    }

    // (4) 마커 데이터
    const fetchMarkers = () => {}

    // 시, 군, 구 가져오기
    const getRegion = (regions, zoom) => {
        let result = ''; 

        if(zoom >= 16) result = `${regions.area1.name} ${regions.area2.name} ${regions.area3.name}`; // 동
        if(zoom < 16 && zoom >= 14) result = `${regions.area1.name} ${regions.area2.name}`;
        if(zoom < 14 && zoom >= 11) result = regions.area1.name; // 시도
        if(zoom < 11) result = ''; // 3km 이상 : 시도 구별 어려움

        console.log(result);

        return result;
    };
   
    // 위도경도 > 주소 변환
    const fetchReverseGeocode = (center) => {
        return new Promise((resolve, reject) => {
            naver.maps.Service.reverseGeocode({
                coords: new naver.maps.LatLng(center[0], center[1]),
                orders: [
                //   naver.maps.Service.OrderType.ADDR,
                ].join(',')
            }, (status, response) => {
                if(status === naver.maps.Service.Status.ERROR) reject("geocode오류");
                else if(response.v2.results.length <= 0) reject("지역 이탈");
                else resolve(response.v2.results[1].region);
            })
        })
    };

    useEffect(()=> {
        initMap();
    }, [])

    return (
        <>
            <Map />
            <MapRegion region = { mapProps.region } />
            <MapChart data = { chart } />
        </>
    )
};

export default MapContainer;