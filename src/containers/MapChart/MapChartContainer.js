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
    const IS_GUGUN = getZoomLevel(ZOOM) === 2;

    const CHART_PROPS = useSelector(state => state.Chart);
    const IS_ACTIVE = CHART_PROPS.activate;
    const HAS_DATA = CHART_PROPS.hasData;
    const CHART_DATA = CHART_PROPS.data;
    
    const [ loading, error, noData, data, setGet ] = useGet({});

    /* === 렌더링 이후 차트 데이터 받아오기(모바일 일 때) === */
    useEffect(() => {
        if(IS_GUGUN) setGet({
            get: getMapChart,
            params: REGION
        })
    }, [ZOOM, REGION]);

    /* === 챠트 데이터 업데이트 === */
    useEffect(() => {
        dispatch(updateChart(data));
    }, [data]);

    useEffect(() => {
        console.log(HAS_DATA);
        if(HAS_DATA) {
            if(isBrowser && IS_GUGUN) dispatch(activateChart());
        } else {
            dispatch(deactivateChart());
        }
    }, [HAS_DATA])

     /* === 주소 | 줌레벨 바뀔 때 차트 활성화 === */
    // useEffect(() => {
    //     if(IS_GUGUN) {
    //         dispatch(updateChart(fetchedData));
    //         if(HAS_DATA && isBrowser) dispatch(activateChart());
    //     } else {
    //         dispatch(deactivateChart());
    //     }
    // }, [ZOOM, REGION]);

    const onCloseClick = () => {
        dispatch(deactivateChart());
    }

    /* === 차트 ELEMENTS === */
    const CHART_TEMPLATE = (CHART_DATA) => (
        <MapChart>
        {
            Object.keys(CHART_DATA).map((key, idx) => (
                <DoughnutChart 
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