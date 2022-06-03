import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from '../../hooks';
import { useDispatch } from "react-redux";
import Panel from "../../components/ui/Panel/Panel";
import CenterItem from "../../components/Center/CenterItem/CenterItem";
import { activateAlert } from '../../store/actions/alert';
import { isBrowser } from "react-device-detect";

const CenterItemContainer = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [page, data] = useFetch({}, '/data/center.json');

    const onContactClick = () => {
        const alertMsg = {
            title: "비회원 매수문의",
            contents: `비회원의 경우 ${ isBrowser? "상단 우측의" : "메인 페이지 하단 메뉴의" } 매수문의를 통해 문의할 수 있습니다.`
        }
        dispatch(activateAlert(alertMsg));
    };


    return (
        <Panel
            type={ "side" }
            position={ "left" }
            fold={ true }
        >
            { page === "success" &&   
                
                <CenterItem 
                    data = { data } 
                    onContactClick = { onContactClick }
                />
            }
            {
                page !== "success" &&
                <div>none</div>
            }
        </Panel>
    )
};

export default CenterItemContainer;