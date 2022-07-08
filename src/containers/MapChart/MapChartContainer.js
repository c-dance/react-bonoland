import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../utils/map';
import { isBrowser, isMobile } from 'react-device-detect';
import { activateChart, updateChart, deactivateChart } from '../../store/actions/chart';
import MapChart from '../../components/MapChart/MapChart';
import CustomDoughnutChart from '../../components/Chart/CustomDoughnutChart/CustomDoughnutChart';
import Section from '../../components/ui/Section/Section';
import DoughnutChart from '../../components/Chart/DoughnutChart/DoughnutChart';

const MapChartContainer = () => {

    const dispatch = useDispatch();
    const IS_GUGUN = getZoomLevel(useSelector(state => state.Map.infos.zoom )) === 'gugun';
    const IS_ACTIVE = useSelector(state => state.Chart.active);
    const CHART_DATA = useSelector(state => state.Chart.data);

    useEffect(() => {
        if(isBrowser && CHART_DATA && IS_GUGUN) dispatch(activateChart());
        else dispatch(deactivateChart());
    }, [CHART_DATA, IS_GUGUN]);


    const onCloseClick = () => {
        dispatch(deactivateChart());
    }

    /* === 차트 ELEMENTS === */
    const CHART_TEMPLATE = (CHART_DATA) => (
        <MapChart>
        {
            CHART_DATA.map((item, idx) => (
                <CustomDoughnutChart 
                    key={idx} 
                    data={ item } 
                    bgColor= {isBrowser? "rgba(0, 0, 54, 0.9)" : null }    
                />
            ))
        }
        </MapChart>
        // {/* <MapChart>
        // {
        //     CHART_DATA.map((item, idx) => (
        //         <DoughnutChart 
        //             key={idx} 
        //             data={ item } 
        //             bgColor= {isBrowser? "rgba(0, 0, 54, 0.9)" : null }    
        //         />
        //     ))
        // }
        // </MapChart> */}
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