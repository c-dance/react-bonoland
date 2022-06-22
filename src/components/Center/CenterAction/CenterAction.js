import React, { useRef } from 'react';
import { Actions, Action } from './CenterActionStyle';
import { useSelector, useDispatch } from 'react-redux';
import { activateLoginRequired } from '../../../store/actions/mode';
import { activateAlert } from '../../../store/actions/alert';

const CenterAction = ({
    scrapped,
    centerId
}) => {

    const dispatch = useDispatch();
    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    const textareaRef = useRef(null);

    const onScrapClick = event => {
        event.preventDefault();
        if(IS_LOGGEDIN) {

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
                className={`scrap${scrapped? " on": ""}` }
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