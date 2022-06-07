import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from '../../hooks';
import { useDispatch } from "react-redux";
import Panel from "../../components/ui/Panel/Panel";
import CenterItem from "../../components/Center/CenterItem/CenterItem";
import { activateAlert } from '../../store/actions/alert';
import { isBrowser } from "react-device-detect";
import { useGet } from "../../hooks";
import { getCenter } from '../../api/center';
import Modal from '../../components/Modal/Modal';
import CalculatorResult from "../../components/Calculator/CalculatorResult/CalculatorResult";

const CenterItemContainer = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [ center, setCetner ] = useState(null);
    const [ loading, error, noData, data, setApi ] = useGet({});
    const [ calcMode, setCalcMode ] = useState(false);

    const onContactClick = () => {
        const alertMsg = {
            title: "비회원 매수문의",
            contents: `비회원의 경우 ${ isBrowser? "상단 우측의" : "메인 페이지 하단 메뉴의" } 매수문의를 통해 문의할 수 있습니다.`
        }
        dispatch(activateAlert(alertMsg));
    };

    const onCalcClick = () => {
        setCalcMode(true);
    };

    const closeCaclulator = () => {
        setCalcMode(false);
    }

    useEffect(() => {
        setApi({
            get: getCenter,
            params: id
        })
    }, []);

    useEffect(() => {
        // setCetner(data);
        setCetner(data[Object.keys(data)[0]]);
    }, [data]);


    return (
        <Panel
            type={ "side" }
            position={ "left" }
            fold={ true }
        >
            <CenterItem 
                center = { center } 
                loaging={ loading }
                error={error}
                noData={noData}
                onContactClick = { onContactClick }
                onCalcClick={ onCalcClick }
            />
            { 
                calcMode && 
                <Modal
                    open={ true }
                    close={ true }
                    onCloseClick={ closeCaclulator }
                    title="수익 계산"
                    width="970"
                >
                    <CalculatorResult />
                </Modal>
            }
        </Panel>
    )
};

export default CenterItemContainer;