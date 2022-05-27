import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../utils/map';
import { isBrowser, isMobile } from 'react-device-detect';
import { activateChart, updateChart, deactivateChart } from '../../store/actions/chart';
import { Charts } from '../../components/MapChart/MapChartStyle';
import DoughnutChart from '../../components/Chart/DoughnutChart/DoughnutChart';

const MapChartContainer = () => {

    const dispatch = useDispatch();
    const ZOOM = useSelector(state => state.Map.zoom );
    const REGION = useSelector(state => state.Map.region );
    const IS_ACTIVE = useSelector(state => state.Chart.activate);
    const IS_GUGUN = getZoomLevel(ZOOM) === 2;


    
    /* === 차트 데이터 받아오기 === */
    const data = {
        "고령인구": [345, 56, 32, 24],
        "등급인원": [4272, 1236, 3036],
        "요양시설": [127, 114, 8, 1, 8] 
    };

    useEffect(() => {

        if(IS_GUGUN) dispatch(activateChart());
        else dispatch(deactivateChart());

    }, [IS_GUGUN, REGION]);

    return (
        <>
            {
                IS_ACTIVE &&
                <Charts>
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
                </Charts>
            }
        </>
    )
};

export default MapChartContainer;