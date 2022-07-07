import { getLocalNumber } from "../../utils/number";

export const BONOSCORE = {
    labels: ["시설평가 등급", "가산현황", "관리상태"]
}

export const GET_MARKETS = mkData => [
    {
        title: "고령인구",
        labels: [
            `남자 ${getLocalNumber(mkData.highAgeManCnt)}명`, 
            `여자 ${getLocalNumber(mkData.highAgeWomanCnt)}명`
        ],
        chartTitle: { 
            main: '총', 
            sub: `${getLocalNumber(mkData.highAgeManCnt + mkData.highAgeWomanCnt)}명` 
        },
        dataset: {
            합계 :mkData.highAgeManCnt + mkData.highAgeWomanCnt, 
            남자: mkData.highAgeManCnt, 
            여자: mkData.highAgeWomanCnt
        },
        customDataset: [
            mkData.highAgeManCnt + mkData.highAgeWomanCnt, 
            mkData.highAgeManCnt,
            mkData.highAgeWomanCnt
        ],
        customLabels: [
            { color: '#7BF5BB', text: `여자 ${getLocalNumber(mkData.highAgeWomanCnt)}`},
            { color: '#E4B251', text: `남자 ${getLocalNumber(mkData.highAgeManCnt)}`},
        ]
    },
    {
        title: "등급인원",
        labels: [
            `남자 ${getLocalNumber(mkData.ratingManCnt)}명`, 
            `여자 ${getLocalNumber(mkData.ratingWomanCnt)}명`
        ],
        chartTitle:{ 
            main: '총', 
            sub: `${getLocalNumber(mkData.ratingManCnt + mkData.ratingWomanCnt)}명` 
        },
        dataset: {
            합계: mkData.ratingManCnt + mkData.ratingWomanCnt,
            남자: mkData.ratingManCnt, 
            여자: mkData.ratingWomanCnt
        }, 
        customDataset: [
            mkData.ratingManCnt + mkData.ratingWomanCnt, 
            mkData.ratingManCnt,
            mkData.ratingWomanCnt
        ],
        customLabels: [
            { color: '#7BF5BB', text: `여자 ${getLocalNumber(mkData.ratingWomanCnt)}` },
            { color: '#E4B251', text: `남자 ${getLocalNumber(mkData.ratingManCnt)}` },
        ]
    },
    {
        title: "요양시설",
        labels: [ 
            `주야간 ${getLocalNumber(mkData.centerTotal)}개`, 
            `요양 ${getLocalNumber(mkData.onlyTotal + mkData.mallTotal)  }개`,
            `방문 ${getLocalNumber(mkData.onlyTotal + mkData.mallTotal)  }개`,
            `공생 ${getLocalNumber(mkData.onlyTotal + mkData.mallTotal)  }개`
        ],
        chartTitle: { 
            main: `${getLocalNumber(mkData.totalPer)}명`, 
            sub: `${getLocalNumber(mkData.onlyTotal + mkData.mallTotal + mkData.centerTotal)}개` 
        },
        dataset: { 
            합계: (mkData.onlyTotal + mkData.mallTotal + mkData.centerTotal),
            주야간: mkData.centerTotal, 
            요양시설: (mkData.onlyTotal + mkData.mallTotal),  
            방문: mkData.centerTotal,
            공생: mkData.centerTotal 
        }, 
        customDataset: [
            (mkData.onlyTotal + mkData.mallTotal + mkData.centerTotal),
            mkData.centerTotal, 
            (mkData.onlyTotal + mkData.mallTotal),  
            mkData.centerTotal,
            mkData.centerTotal 
        ],
        customLabels: [
            { color: '#E4B251', text: `주야간 ${getLocalNumber(mkData.centerTotal)}` },
            { color: '#7BF5BB', text: `요양시설 ${getLocalNumber(mkData.onlyTotal + mkData.mallTotall)}` },
            { color: '#E98686', text: `방문 ${getLocalNumber(mkData.centerTotal)}` },
            { color: '#616161', text: `공생 ${getLocalNumber(mkData.centerTotal)}` },
        ]
    },
    {
        title: "이용율",
        labels: [
            // `정원 ${getLocalNumber(mkData.totalPer)}명`, 
            `인원 ${getLocalNumber(mkData.currentPer)}명`
        ],
        chartTitle:{ 
            main: '이용율', 
            sub: `${getLocalNumber(mkData.usePercent)}%` 
        },
        dataset: {
            합계: mkData.totalPer,
            인원: mkData.currentPer,
        }, 
        customDataset: [
            mkData.totalPer,
            mkData.currentPer,
        ],
        customLabels: [
            { color: '#E4B251', text: `인원 ${getLocalNumber(mkData.currentPer)} 명` },
            { color: '#fff', text: `정원 ${getLocalNumber(mkData.totalPer)} 명` }
        ]
    }
]