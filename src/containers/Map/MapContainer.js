import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMapProps } from '../../store/actions/map';
import { isBrowser } from 'react-device-detect';
import Map from '../../components/Map/Map';
import MapRegion from '../../components/MapRegion/MapRegion';
import { getRegionByLatlng, getRegionByZoom } from '../../utils/map';

// 차트, 주소, 맵 분리 필요

const { naver } = window; 

const MapContainer = () => {
    const dispatch = useDispatch();
    const mapProps = useSelector(state => state.Map);

   /* === 지도 생성 === */
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

        naver.maps.Event.addListener(map, 'zoom_changed', () => { updateMap(map) });
        naver.maps.Event.addListener(map, 'bounds_changed', () => { updateMap(map) });
    };

    //* === 지도 업데이트 (줌 변경 시 || 지역 이동 시) === */
    const updateMap = async (map) => {
        const zoom = map.getZoom(); // 줌 레벨(raw)
        const latlng = [map.getCenter()._lat, map.getCenter()._lng]; // 위경도
        const region = getRegionByZoom(await getRegionByLatlng(latlng), zoom); // 시도/구군/읍면동에 따른 주소

        updateMapStore(latlng, zoom, region);
        // resetCharts(region, zoom);  
    };

    // 스토어 업데이트
    const updateMapStore = (latlng = mapProps.latlng, zoom = mapProps.zoom, region = '') => {
        let props = {
            latlng: latlng,
            zoom: zoom ,
            region: region
        };
        
        dispatch(updateMapProps(props));
    };

    // 차트 데이터 갱신
    const resetCharts = async (region, zoom) => {
        let data = null;
        if(zoom < 16 && zoom >= 14) {
            data = await fetchChart(region);
            // setChart(data);
        } 
        // setChart(data);
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

    useEffect(()=> {
        initMap();
    }, [])

    return (
        <>
            <Map />
            { isBrowser && <MapRegion region = { mapProps.region } /> }
            {/* <MapChart data = { chart } /> */}
        </>
    )
};

export default MapContainer;