import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../utils/map';
import { isBrowser, isMobile } from 'react-device-detect';
import { activateChart, updateChart, deactivateChart } from '../../store/actions/chart';
import MapChart from '../../components/MapChart/MapChart';
import DoughnutChart from '../../components/Chart/DoughnutChart/DoughnutChart';
import Section from '../../components/ui/Section/Section';

const MapChartContainer = () => {

    const dispatch = useDispatch();

    const ZOOM = useSelector(state => state.Map.zoom );
    const REGION = useSelector(state => state.Map.region );
    const IS_GUGUN = getZoomLevel(ZOOM) === 2;

    const CHART_PROPS = useSelector(state => state.Chart);
    const IS_ACTIVE = CHART_PROPS.activate;
    const HAS_DATA = CHART_PROPS.hasData;
    const data = CHART_PROPS.data;

    /* === 차트 데이터 받아오기 === */
    let fetchedData = {
        "고령인구": [345, 56, 32, 24],
        "등급인원": [4272, 1236, 3036],
        "요양시설": [127, 114, 8, 1, 8] 
    };
    let fetchedData02 = {};

    /* === 렌더링 이후 차트 데이터 받아오기(모바일 일 때) === */
    useEffect(() => {
        if(IS_GUGUN && isMobile) dispatch(updateChart(fetchedData));
    }, []);

     /* === 주소 | 줌레벨 바뀔 때 차트 활성화 === */
    useEffect(() => {
        if(IS_GUGUN) {
            dispatch(updateChart(fetchedData));
            if(HAS_DATA && isBrowser) dispatch(activateChart());
        } else {
            dispatch(deactivateChart());
        }
    }, [ZOOM, REGION]);

    const onCloseClick = () => {
        dispatch(deactivateChart());
    }

    /* === 차트 ELEMENTS === */
    const RENDER_CHART = (data) => (
        <MapChart>
        {
            Object.keys(data).map((key, idx) => (
                <DoughnutChart 
                    type={ "main" }
                    scheme={ key }
                    data={ data[key] }
                    key={ idx }
                />
            ))
        }
        </MapChart>
    );

    return (
        <>
            {
                isBrowser && IS_ACTIVE &&
                RENDER_CHART(data)
            }
            {
                isMobile && IS_ACTIVE &&
                <Section
                    themeColor="primary"
                    title="시장 현황"
                    close={ true }
                    onCloseClick={ onCloseClick }
                >
                    { RENDER_CHART(data) }
                </Section>
            }
        </>
    )
};

export default MapChartContainer;