import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZoomLevel } from '../../../utils/map';
import { activateChart, deactivateChart } from '../../../store/actions/chart';
import { QuickLink, QuickBtn } from './QuickMenuStyle';
import { activateCalculator, activateLogin, activateLoginRequired } from '../../../store/actions/service';
import { activateCadastral, deactivateCadastral } from '../../../store/actions/map';
import { isBrowser, isMobile } from 'react-device-detect';
import { GEOLOCATION } from '../../../utils/user';
import { updateGeolocation } from '../../../store/actions/geolocation';
import { activateAlert } from '../../../store/actions/alert';
import { useNavigate } from 'react-router';
import { updateFilter } from '../../../store/actions/filter';
import { activateMyAlarm, activateMyMenu, activateNews, activateMyAlarmForm } from '../../../store/actions/page';

const QuickMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MAP = useSelector(state => state.Map);
    const ZOOM = MAP.zoom;
    const CADASTRAL = MAP.cadastral;

    const USER_GEO = useSelector(state => state.Geolocation.latlng);

    const [ chartReady, setChartReady ] = useState(false);
    const CHART_DATA = useSelector(state => state.Chart.data);
    const CHART_ACTIVE = useSelector(state => state.Chart.active);
    
    const USER = useSelector(state => state.User);
    const USER_LOGGEDIN = USER.loggedIn;
    const LOCAL_ALARMS = USER.userInfo.alarms && USER.userInfo.alarms.length > 0;

    const onChartClick = () => {
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
                const LATLNG = [ (position.coords.longitude).toString(), (position.coords.latitude).toString() ];
                dispatch(updateGeolocation(LATLNG));
                dispatch(updateFilter({ latlng: LATLNG }));
            })
            .catch(err => {
                console.error(err.message);
                dispatch(activateAlert({
                    title: "사용자 위치 정보 조회",
                    contents: "현재 사용자의 위치 정보를 가져올 수 없습니다."
                }))
            })
    };

    useEffect(()=> {
        if(getZoomLevel(ZOOM) === 'gugun' && CHART_DATA) setChartReady(true);
        else setChartReady(false);
    }, [ZOOM, CHART_DATA]);

    return (
        <>
            {
                isBrowser &&
                <QuickBtn 
                    className={`user ${LOCAL_ALARMS? "on" : ""}` } 
                    onClick={() => {
                        if(USER_LOGGEDIN) dispatch(activateMyMenu())
                        else dispatch(activateLogin())
                    }}
                >마이페이지</QuickBtn>
            }
            { 
                isBrowser && 
                <QuickBtn 
                    className={`alarm ${LOCAL_ALARMS? "on" : ""}` }
                    onClick={() => {
                        if(USER_LOGGEDIN){ 
                            if(LOCAL_ALARMS) dispatch(activateMyAlarm());
                            else dispatch(activateMyAlarmForm());
                        } else { 
                            dispatch(activateLoginRequired())
                        }
                    }}
                >알람 설정</QuickBtn> 
            }
            <QuickBtn className={`location ${ (USER_GEO && USER_GEO.length > 0)? 'active' : '' }`} onClick={ () => onLocationClick() }>내위치</QuickBtn>
            <QuickBtn className={ `chart ${chartReady? 'on' : ''}` } onClick={ () => onChartClick() }>인구</QuickBtn>
            <QuickBtn className="news" onClick={() => dispatch(activateNews())}>뉴스</QuickBtn>
            <QuickBtn className={`cad ${CADASTRAL? 'on' : '' }`} onClick={ () => onCadastralClick() }>지적도</QuickBtn>
            { isMobile && <QuickBtn className="calc mobile" onClick={ () => dispatch(activateCalculator()) }>수익계산기</QuickBtn> }
        </>
    )
}

export default QuickMenu;