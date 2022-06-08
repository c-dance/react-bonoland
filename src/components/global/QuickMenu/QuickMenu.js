import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../../utils/map';
import { activateChart, deactivateChart } from '../../../store/actions/chart';
import { QuickLink, QuickBtn } from './QuickMenuStyle';
import { activateCalculator, activateLogin } from '../../../store/actions/mode';
import { activateCadastral, deactivateCadastral, updateMapFilter } from '../../../store/actions/map';
import { isBrowser, isMobile } from 'react-device-detect';
import { GEOLOCATION } from '../../../utils/user';
import { updateUserGeolocation } from '../../../store/actions/user';
import { activateAlert } from '../../../store/actions/alert';

const QuickMenu = () => {

    const dispatch = useDispatch();
    const ZOOM = useSelector(state => state.Map.zoom);
    const IS_GUGUN = getZoomLevel(ZOOM) === 2;
    const CHART_DATA = useSelector(state => state.Chart.data);
    const CHART_ACTIVE = useSelector(state => state.Chart.active);
    const [ chartReady, setChartReady ] = useState(false);
    const CADASTRAL = useSelector(state => state.Map.cadastral);
    const USER_GEO = useSelector(state => state.User.geolocation);

    const onChartClick = () => {
        // if(chartReady && isMobile) {dispatch(activateChart());}
        if(chartReady) {
            if(CHART_ACTIVE) dispatch(deactivateChart());
            else dispatch(activateChart());
        } else {
            dispatch(activateAlert({
                title: "인구 통계",
                contents: "현재 위치에서 확인 가능한 인구 통계가 없습니다."
            }))
        }
    };

    const onCadastralClick = () => {
        if(CADASTRAL) dispatch(deactivateCadastral());
        else dispatch(activateCadastral());
    };

    const onLocationClick = async () => {
        GEOLOCATION.get()
            .then(position => {
                const geo = [ (position.coords.longitude).toString(), (position.coords.latitude).toString() ];
                dispatch(updateUserGeolocation(geo));
                dispatch(updateMapFilter({ latlng: geo}));
            })
            .catch(err => {
                console.error(err.message);
                dispatch(activateAlert({
                    title: "사용자 위치 정보 조회",
                    contents: "현재 사용자의 위치 정보를 가져올 수 없습니다."
                }))
            })
    };

    const testLogin = () => {
        dispatch(activateLogin());
    };

    useEffect(()=> {
        if(IS_GUGUN && CHART_DATA) setChartReady(true);
        else setChartReady(false);
    }, [ZOOM, CHART_DATA]);

    return (
        <>
            { isBrowser && <QuickLink className="user" to="/user">마이페이지</QuickLink> }
            {/* { isMobile && <QuickBtn className="user" onClick={ () => testLogin() } >마이페이지</QuickBtn> } */}
            { isBrowser && <QuickLink className="alarm" to="/user/alarm">알람설정</QuickLink> }
            <QuickBtn className={`location ${ (USER_GEO && USER_GEO.length > 0)? 'active' : '' }`} onClick={ () => onLocationClick() }>내위치</QuickBtn>
            <QuickBtn className={ `chart ${chartReady? 'on' : ''}` } onClick={ () => onChartClick() }>인구</QuickBtn>
            <QuickLink className="news" to="/news">뉴스</QuickLink>
            <QuickBtn className={`cad ${CADASTRAL? 'on' : '' }`} onClick={ () => onCadastralClick() }>지적도</QuickBtn>
            { isMobile && <QuickBtn className="calc mobile" onClick={ () => dispatch(activateCalculator()) }>수익계산기</QuickBtn> }
        </>
    )
}

export default QuickMenu;