import { QuickLink, QuickBtn } from './QuickMenuStyle';
import { useDispatch } from 'react-redux';
import { activateCalculator } from '../../../store/actions/mode';
import { isBrowser, isMobile } from 'react-device-detect';

const QuickMenu = () => {

    const dispatch = useDispatch();

    return (
        <>
            { isBrowser && <QuickLink className="user" to="/user">마이페이지</QuickLink> }
            { isBrowser && <QuickLink className="alarm" to="/user/alarm">알람설정</QuickLink> }
            <QuickBtn className={ `chart ${ isMobile &&'mobile'}` }>인구</QuickBtn>
            <QuickLink className={ `news ${ isMobile &&'mobile'}` } to="/news">뉴스</QuickLink>
            { isMobile && <QuickBtn className="calc mobile" onClick={ () => dispatch(activateCalculator()) }>수익계산기</QuickBtn> }
        </>
    )
}

export default QuickMenu;