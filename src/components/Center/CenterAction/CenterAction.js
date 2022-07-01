import React, { useRef, useState, useEffect } from 'react';
import { Actions, Action } from './CenterActionStyle';
import { useSelector, useDispatch } from 'react-redux';
import { activateLoginRequired } from '../../../store/actions/service';
import { activateAlert } from '../../../store/actions/alert';
import { setUserScrap } from '../../../api/user';

const CenterAction = ({
    scrapped,
    centerId
}) => {

    const dispatch = useDispatch();
    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);
    const USER_NO = useSelector(state => state.User.userInfo.no);

    const textareaRef = useRef(null);
    const [ isScrapped, setIsScrapped ] = useState(scrapped);

    const onScrapClick = async event => {
        event.preventDefault();
        if(IS_LOGGEDIN) {
            const RESPONSE = await setUserScrap({
                userNo: USER_NO, 
                longTermAdminSym: centerId
            });
            if(RESPONSE) {
                RESPONSE.data.code >=2 ? alert('찜 등록') : alert('찜 해제');
                setIsScrapped(RESPONSE.data.code >= 2);
            }
        } else {
            dispatch(activateLoginRequired());
        }
    };
    
    const onShareClick = event => {
        event.preventDefault();
        textareaRef.current.select();
        document.execCommand('copy');
        dispatch(activateAlert({
            title: "매물 공유",
            contents: "현재 페이지의 링크가 복사되었습니다."
        }))
    };

    return (
        <Actions>
            <Action
                className={`scrap${isScrapped? " on": ""}` }
                onClick={ (event) => onScrapClick(event) }
            >스크랩</Action>
            <Action 
                className="share" 
                onClick={ (event) => onShareClick(event) }
            >공유</Action>
            <textarea 
                readOnly
                ref={ textareaRef }
                value={`https://bonoland.co.kr/center/${centerId}`}    
            />
        </Actions>
    )
}

export default CenterAction;