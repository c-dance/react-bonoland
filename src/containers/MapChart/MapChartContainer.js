import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../utils/map';
import { isBrowser, isMobile } from 'react-device-detect';
import { activateChart, updateChart, deactivateChart } from '../../store/actions/chart';
import MapChart from '../../components/MapChart/MapChart';
import DoughnutChart from '../../components/Chart/DoughnutChart/DoughnutChart';
import Section from '../../components/ui/Section/Section';
import { useGet } from "../../hooks";
import { getMapChart } from '../../api/mapChart';

const MapChartContainer = () => {

    const dispatch = useDispatch();

    const ZOOM = useSelector(state => state.Map.zoom );
    const REGION = useSelector(state => state.Map.region );
    const IS_GUGUN = getZoomLevel(ZOOM) === 'gugun';

    const IS_ACTIVE = useSelector(state => state.Chart.active);
    const CHART_DATA = useSelector(state => state.Chart.data);
    
    const [ loading, error, data, setGet ] = useGet({});

    /* === 렌더링 이후 차트 데이터 받아오기(모바일 일 때) === */
    useEffect(() => {
        if(IS_GUGUN) {
            setGet(getMapChart(REGION)) 
        } else {
            dispatch(deactivateChart());
        }
    }, [ZOOM, REGION]);

    /* === 챠트 데이터 업데이트 === */
    useEffect(() => {
        if(Object.keys(data).length > 0) {
            dispatch(updateChart(data));
            if(IS_GUGUN && Object.keys(data).length > 0 && isBrowser ) dispatch(activateChart());
            if(!IS_GUGUN || Object.keys(data).length <= 0) dispatch(deactivateChart()); 
        }
    }, [data]);

    const onCloseClick = () => {
        dispatch(deactivateChart());
    }

    /* === 차트 ELEMENTS === */
    const CHART_TEMPLATE = (CHART_DATA) => (
        <MapChart>
        {
            Object.keys(CHART_DATA).map((key, idx) => (
                <DoughnutChart 
                    key={ idx }
                    type={ "main" }
                    title={ key }
                    data={ CHART_DATA[key] }
                />
            ))
        }
        </MapChart>
    );

    return (
        <>
            {
                isBrowser && IS_ACTIVE &&
                <>
                { CHART_TEMPLATE(CHART_DATA) }
                </>
            }
            {
                isMobile && IS_ACTIVE &&
                <Section
                    themeColor="primary"
                    title="시장 현황"
                    close={ true }
                    onCloseClick={ onCloseClick }
                >
                    { CHART_TEMPLATE(CHART_DATA) }
                </Section>
            }
        </>
    )
};

export default MapChartContainer;