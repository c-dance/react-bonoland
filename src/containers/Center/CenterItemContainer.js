import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../../components/ui/Panel/Panel";
import CenterItem from "../../components/Center/CenterItem/CenterItem";
import { activateAlert } from '../../store/actions/alert';
import { isBrowser } from "react-device-detect";
import { useGet } from "../../hooks";
import { getCenter } from '../../api/center';
import { activateContact, activateCalculator } from "../../store/actions/mode";
import { updateFilter } from "../../store/actions/filter";
import { ZOOMS } from '../../scheme/map/index';


const CenterItemContainer = () => {

    const dispatch = useDispatch();

    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);

    const { id } = useParams();
    const [ center, setCenter ] = useState(null);
    const [ loading, error, noData, data, setGet ] = useGet({});
    const [ calcMode, setCalcMode ] = useState(false);

    const onContactClick = () => {
        if(IS_LOGGEDIN) {
            dispatch(activateContact());
        } else {            
            dispatch(activateAlert({
                title: "비회원 매수문의",
                contents: `비회원의 경우 ${ isBrowser? "상단 우측의" : "메인 페이지 하단 메뉴의" } 매수문의를 통해 문의할 수 있습니다.`
            }));
        }
    };

    const onCalcClick = () => {
        // 매물 수익계산 api 통해서 데이터 가져옴
        dispatch(activateCalculator({
            input: {
                capacity: "29",
                commons: "5",
                helpers: "0",
                loan: "1,760,000,000",
                penalty: "0",
                premiumPrice: "0",
                premiums: "0",
                price: "2,200,000,000",
                rent: "0",
                type: "단독요양원" 
            },
            output: {
                수입: {
                    가산금: {
                        capacity: "",
                        title: "가산금",
                        totalPrice: "0",
                        unitPrice: ""
                    },
                    간식비: {
                        capacity: 5,
                        title: "간식비",
                        totalPrice: "150,000",
                        unitPrice: "30,000"
                    },
                    공단지원금: {
                        capacity: 5,
                        title: "공단지원금 80%",
                        totalPrice: "8,334,000",
                        unitPrice: "1,666,800"
                    },
                    본인부담금: {
                        capacity: 5,
                        title: "본인부담금 20%",
                        totalPrice: "2,083,500",
                        unitPrice: "416,700"
                    },
                    상급병실료: {
                        capacity: 5,
                        title: "상급병실료",
                        totalPrice: "0",
                        unitPrice: ""
                    },
                    식대: {
                        capacity: 5,
                        title: "식대",
                        totalPrice: "1,500,000",
                        unitPrice: "300,000"
                    },
                    합계: {
                        capacity: "",
                        title: "합계",
                        totalPrice: "12,067,500",
                        unitPrice: ""
                    }
                },
                지출: {
                    간호사: {
                        capacity: 0,
                        title: "간호(조무)사",
                        totalPrice: "0",
                        unitPrice: "2,200,000"
                    },
                    관리비: {
                        capacity: "29",
                        memo: "평당 5,000원",
                        title: "관리비(냉난방, 전기, 가스 외)",
                        totalPrice: "1,035,300",
                        unitPrice: "5,000",
                    },
                    관리인: {
                        capacity: 0,
                        memo: "주간보호센터 : 보조원(운전사)",
                        title: "관리인",
                        totalPrice: "0",
                        unitPrice: "2,100,000"
                    },
                    기타비용: {
                        capacity: 5,
                        memo: "1인당 10,000원",
                        title: "기타비용",
                        totalPrice: "50,000",
                        unitPrice: "10,000"
                    },
                    대출이자: {
                        capacity: "",
                        memo: "N억 X 3.5% / 12개월",
                        title: "대출이자(월차임)",
                        totalPrice: "5,133,333",
                        unitPrice: "0"
                    },
                    물리치료사: {
                        capacity: 0,
                        title: "물리치료사",
                        totalPrice: "0",
                        unitPrice: "2,300,000"
                    },
                    사무국장: {
                        capacity: 0,
                        title: "사무국장",
                        totalPrice: "0",
                        unitPrice: "2,400,000"
                    },
                    사무원: {
                        capacity: 0,
                        title: "사무원",
                        totalPrice: "0",
                        unitPrice: "2,000,000"
                    },
                    사회복지사: {
                        capacity: 1,
                        title: "사회복지사",
                        totalPrice: "2,300,000",
                        unitPrice: "2,300,000"
                    },
                    소모품비: {
                        capacity: 5,
                        memo: "1인당 30,000원",
                        title: "소모품비",
                        totalPrice: "150,000",
                        unitPrice: "30,000"
                    },
                    시설장: {
                        capacity: 1,
                        title: "시설장",
                        totalPrice: "3,000,000",
                        unitPrice: "3,000,000"
                    },
                    식재료비: {
                        capacity: 5,
                        memo: "1인당 8,000원/일",
                        title: "식재료비/간식비",
                        totalPrice: "1,200,000",
                        unitPrice: "8,000"
                    },
                    영양사: {
                        capacity: 0,
                        title: "영양사",
                        totalPrice: "0",
                        unitPrice: "2,400,000"
                    },
                    요양보호사: {
                        capacity: 2,
                        title: "요양보호사",
                        totalPrice: "4,400,000",
                        unitPrice: "2,200,000"
                    },
                    위생원: {
                        capacity: 0,
                        title: "위생원",
                        totalPrice: "0",
                        unitPrice: "1,800,000"
                    },
                    의사: {
                        capacity: 1,
                        title: "(촉탁)의사",
                        totalPrice: "",
                        unitPrice: ""
                    },
                    인건비: {
                        capacity: "",
                        title: "인건비",
                        totalPrice: "9,700,000",
                        unitPrice: ""
                    },
                    인건비외: {
                        capacity: "",
                        title: "인건비 외",
                        totalPrice: "9,004,423",
                        unitPrice: ""
                    },
                    조리원: {
                        capacity: 0,
                        title: "조리원",
                        totalPrice: "0",
                        unitPrice: "2,100,000"
                    },
                    퇴직금: {
                        capacity: "",
                        memo: "인건비 X 7.1% + 150,000원/인",
                        title: "퇴직금/보험",
                        totalPrice: "1,435,790",
                        unitPrice: ""
                    },
                    합계: {
                        capacity: "",
                        title: "합계",
                        totalPrice: "18,704,423",
                        unitPrice: ""
                    }
                },
                월수익: {
                    capacity: "",
                    title: "월수익",
                    totalPrice: "-6,636,923",
                    unitPrice: ""
                }
            }
        }));
    };

    useEffect(() => {
        setGet(getCenter({
            centerNo: id,
            userNo: null // login no
        }))
    }, []);
    
    useEffect(() => {
        if(data.result) {
            setCenter(data.result); // 데이터 저장
            dispatch(updateFilter({ latlng: [data.result.x, data.result.y], zoom: ZOOMS["dong"][0] })); // 좌표 이동
        }
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
        </Panel>
    )
};

export default CenterItemContainer;