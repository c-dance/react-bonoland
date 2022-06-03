import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../../utils/map';
import { activateChart, deactivateChart } from '../../../store/actions/chart';
import { QuickLink, QuickBtn } from './QuickMenuStyle';
import { activateCalculator } from '../../../store/actions/mode';
import { activateCadastral, deactivateCadastral } from '../../../store/actions/map';
import { isBrowser, isMobile } from 'react-device-detect';

const QuickMenu = () => {

    const dispatch = useDispatch();
    const ZOOM = useSelector(state => state.Map.zoom);
    const IS_GUGUN = getZoomLevel(ZOOM) === 2;
    const HAS_DATA = useSelector(state => state.Chart.hasData);
    const [ chartReady, setChartReady ] = useState(false);
    const CADASTRAL = useSelector(state => state.Map.cadastral);

    const onChartClick = () => {
        if(chartReady) dispatch(activateChart());
        else alert('정보가 없습니다.');
    };

    const onCadastralClick = () => {
        if(CADASTRAL) dispatch(deactivateCadastral());
        else dispatch(activateCadastral());
    };

    const onLocationClick = () => {
        
    };

    useEffect(()=> {
        if(IS_GUGUN && HAS_DATA) setChartReady(true);
        else setChartReady(false)
    }, [ZOOM, HAS_DATA]);

    return (
        <>
            { isBrowser && <QuickLink className="user" to="/user">마이페이지</QuickLink> }
            { isBrowser && <QuickLink className="alarm" to="/user/alarm">알람설정</QuickLink> }
            <QuickBtn className="location" onClick={ () => onLocationClick() }>내위치</QuickBtn>
            <QuickBtn className={ `chart ${chartReady? 'on' : ''}` } onClick={ () => onChartClick() }>인구</QuickBtn>
            <QuickLink className="news" to="/news">뉴스</QuickLink>
            <QuickBtn className={`cad ${CADASTRAL? 'on' : '' }`} onClick={ () => onCadastralClick() }>지적도</QuickBtn>
            { isMobile && <QuickBtn className="calc mobile" onClick={ () => dispatch(activateCalculator()) }>수익계산기</QuickBtn> }
        </>
    )
}

export default QuickMenu;