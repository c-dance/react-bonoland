import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../../utils/map';
import { activateChart, deactivateChart } from '../../../store/actions/chart';
import { QuickLink, QuickBtn } from './QuickMenuStyle';
import { activateCalculator } from '../../../store/actions/mode';
import { isBrowser, isMobile } from 'react-device-detect';
import { useEffect } from 'react';

const QuickMenu = () => {

    const dispatch = useDispatch();
    const ZOOM = useSelector(state => state.Map.zoom);
    const IS_GUGUN = getZoomLevel(ZOOM) === 2;
    const HAS_DATA = useSelector(state => state.Chart.hasData);
    const [ chartReady, setChartReady ] = useState(false);

    const onChartClick = () => {
        if(chartReady) dispatch(activateChart());
        else alert('정보가 없습니다.');
    };

    useEffect(()=> {
        if(IS_GUGUN && HAS_DATA) setChartReady(true);
        else setChartReady(false)
    }, [ZOOM, HAS_DATA]);

    return (
        <>
            { isBrowser && <QuickLink className="user" to="/user">마이페이지</QuickLink> }
            { isBrowser && <QuickLink className="alarm" to="/user/alarm">알람설정</QuickLink> }
            <QuickBtn className={ `chart ${chartReady? 'on' : ''}` } onClick={ () => onChartClick() }>인구</QuickBtn>
            <QuickLink className="news" to="/news">뉴스</QuickLink>
            { isMobile && <QuickBtn className="calc mobile" onClick={ () => dispatch(activateCalculator()) }>수익계산기</QuickBtn> }
        </>
    )
}

export default QuickMenu;