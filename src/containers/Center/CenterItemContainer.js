import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../../components/ui/Panel/Panel";
import CenterItem from "../../components/Center/CenterItem/CenterItem";
import { activateAlert } from '../../store/actions/alert';
import { isBrowser } from "react-device-detect";
import { useGet } from "../../hooks";
import { getCenter, getCenterCalc } from '../../api/center';
import { activateContact, activateCalculator } from "../../store/actions/service";
import { updateMapFilter } from "../../store/actions/map";
import { ZOOMS } from '../../scheme/map/index';
import { getLocalNumber } from "../../utils/number";

const CenterItemContainer = () => {

    const dispatch = useDispatch();

    const IS_LOGGEDIN = useSelector(state => state.User.loggedIn);
    const USER_NO = useSelector(state => state.User.userInfo.no);

    const { id } = useParams();
    const [ center, setCenter ] = useState(null);
    const [ loading, error, data, setGet ] = useGet({});
    const [ calcMode, setCalcMode ] = useState(false);

    const onContactClick = () => {
        if(IS_LOGGEDIN) {
            dispatch(activateContact({
                sido: center['sisul']['siDoCd'],
                gugun: center['sisul']['siGunGuCd'],
                type: center["sisul"]['adminPttnCd'],   
            }));
        } else {            
            dispatch(activateAlert({
                title: "비회원 매수문의",
                contents: `비회원의 경우 ${ isBrowser? "상단 우측의" : "메인 페이지 하단 메뉴의" } 매수문의를 통해 문의할 수 있습니다.`
            }));
        }
    };

    const onCalcClick = async () => {
        const RESPONSE = await getCenterCalc({ longTermAdminSym: id });
        const data = RESPONSE.data.result;
        const currentCap = getLocalNumber(data["generalHospitalRoom"] + data["seniorHospitalRoom"]);

        console.log(data);

        // 매물 수익계산 api 통해서 데이터 가져옴
        dispatch(activateCalculator({
            fixedData: true,
            input: {
                capacity: data["toPer"],
                commons: data["generalHospitalRoom"],
                helpers: "0",
                loan: data["charLoans"],
                penalty: "0",
                premiumPrice: data["charSeniorHospitalFeesPrice"],
                premiums: "0",
                price: data["charTradingPrice"],
                rent: data["charMonthlyRent"],
                type: data["adminPttnCd"] 
            },
            output: {
                수입: {
                    합계: {
                        capacity: currentCap,
                        title: "합계",
                        totalPrice: data["charTotalIncome"],
                        unitPrice: ""
                    },
                    공단지원금: {
                        capacity: currentCap,
                        title: "공단지원금 80%",
                        totalPrice: data["charGrant80"],
                        unitPrice: "1,666,800"
                    },
                    본인부담금: {
                        capacity: currentCap,
                        title: "본인부담금 20%",
                        totalPrice: data["charSelfPayment20"],
                        unitPrice: "416,700"
                    },
                    식대: {
                        capacity: currentCap,
                        title: "식대",
                        totalPrice: data["charMealFee"],
                        unitPrice: "300,000"
                    },
                    간식비: {
                        capacity: currentCap,
                        title: "간식비",
                        totalPrice: data["charSnackFee"],
                        unitPrice: "30,000"
                    },
                    상급병실료: {
                        capacity: currentCap,
                        title: "상급병실료",
                        totalPrice: data["charSeniorHospitalFeesPrice"],
                        unitPrice: ""
                    },
                    가산금: {
                        capacity: "",
                        title: "가산금",
                        totalPrice: "0",
                        unitPrice: ""
                    },
                },
                지출: {
                    합계: {
                        capacity: "",
                        title: "합계",
                        totalPrice: data["charTotalExpenditure"],
                        unitPrice: ""
                    },
                    인건비: {
                        capacity: "",
                        title: "인건비",
                        totalPrice: data["charTotalLaborCost"],
                        unitPrice: ""
                    },
                    시설장: {
                        capacity: data["equipLong"],
                        title: "시설장",
                        totalPrice: data["charEquipLong"],
                        unitPrice: data["charEquipLongPrice"]
                    },
                    사무국장: {
                        capacity: data["hdOfce"],
                        title: "사무국장",
                        totalPrice: data["charHdOfce"],
                        unitPrice: data["charHdOfcePrice"]
                    },
                    사회복지사: {
                        capacity: data["socWel"],
                        title: "사회복지사",
                        totalPrice: data["charSocWel"],
                        unitPrice: data["charSocWelPrice"]
                    },
                    간호사: {
                        capacity: data["nur"],
                        title: "간호(조무)사",
                        totalPrice: data["charnur"],
                        unitPrice: data["charNurPrice"]
                    },
                    요양보호사: {
                        capacity: data["recuProt"],
                        title: "요양보호사",
                        totalPrice: data["charRecuProt"],
                        unitPrice: data["charRecuProtPrice"]
                    },
                    물리치료사: {
                        capacity: data["physicalMTret"],
                        title: "물리치료사",
                        totalPrice: data["charPhysicalMTret"],
                        unitPrice: data["charPhysicalMTretPrice"]
                    },
                    의사: {
                        capacity: "",
                        title: "(촉탁)의사",
                        totalPrice: "",
                        unitPrice: ""
                    },
                    영양사: {
                        capacity: data["nut"],
                        title: "영양사",
                        totalPrice: data["charNut"],
                        unitPrice: data["charNutPrice"]
                    },
                    조리원: {
                        capacity: data["cook"],
                        title: "조리원",
                        totalPrice: data["charCook"],
                        unitPrice: data["charCookPrice"]
                    },
                    위생원: {
                        capacity: data["hygiPrsn"],
                        title: "위생원",
                        totalPrice: data["charHygiPrsn"],
                        unitPrice: data["charHygiPrsnPrice"]
                    },
                    사무원: {
                        capacity: data["ofceEmp"],
                        title: "사무원",
                        totalPrice: data["charOfceEmp"],
                        unitPrice: data["charOfceEmpPrice"]
                    },
                    관리인: {
                        capacity: data["adminPttnCd"] === "주야간보호센터"? data["suppPrsn"] : data["mgmtPrsn"],
                        memo: data["remarks1"],
                        title: "관리인",
                        totalPrice: data["adminPttnCd"] === "주야간보호센터"? data["charSuppPrsn"] : data["charMgmtPrsn"],
                        unitPrice: data["adminPttnCd"] === "주야간보호센터"? data["charSuppPrsnPrice"] : data["charMgmtPrsnPrice"]
                    },
                    인건비외: {
                        capacity: "",
                        title: "인건비 외",
                        totalPrice: data["charOtherTotal"],
                        unitPrice: ""
                    },
                    식재료비: {
                        capacity: currentCap,
                        memo: data["remarks2"],
                        title: "식재료비/간식비",
                        totalPrice: data["charEtcFoodCost"],
                        unitPrice: data["charEtcFoodCostPrice"]
                    },
                    관리비: {
                        capacity: data["toPer"],
                        memo: data["remarks3"],
                        title: "관리비(냉난방, 전기, 가스 외)",
                        totalPrice: data["charEtcAdminCost"],
                        unitPrice: data["charEtcAdminCostPrice"]
                    },
                    소모품비: {
                        capacity: currentCap,
                        memo: data["remarks4"],
                        title: "소모품비",
                        totalPrice: data["charEtcAdminCost"],
                        unitPrice: data["charEtcConsumableCostPrice"]
                    },
                    기타비용: {
                        capacity: currentCap,
                        memo: data["remarks5"],
                        title: "기타비용",
                        totalPrice: data["charEtcOtherCost"],
                        unitPrice: data["charEtcOtherCostPrice"]
                    },
                    대출이자: {
                        capacity: "",
                        memo: data["remarks6"],
                        title: "대출이자(월차임)",
                        totalPrice: data["charLoanInterest"],
                        unitPrice: data["charLoanInterestPrice"]
                    },
                    퇴직금: {
                        capacity: "",
                        memo: data["remarks7"],
                        title: "퇴직금/보험",
                        totalPrice: data["charSeverancePay"],
                        unitPrice: ""
                    }
                },
                월수익: {
                    capacity: "",
                    title: "월수익",
                    totalPrice: data["charMonthlyRevenue"],
                    unitPrice: ""
                }
            }
        }));
    };
    useEffect(() => {
        setGet(getCenter({ userNo: USER_NO, longTermAdminSym: id }));
    }, [USER_NO]);
    
    useEffect(() => {
        if(data.result) {
            setCenter(data.result); // 데이터 저장
            dispatch(updateMapFilter({ latlng: [data.result.x, data.result.y], zoom: ZOOMS["dong"][0] })); // 좌표 이동
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
                onContactClick = { onContactClick }
                onCalcClick={ onCalcClick }
            />
        </Panel>
    )
};

export default CenterItemContainer;