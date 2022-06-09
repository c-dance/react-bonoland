import { CALCULATOR, getLocalNumber } from "../../utils/number";

export const CALCULATOR_FORM = [
    {
        label: "요양시설 타입",
        type: "select",
        options: [
            "단독요양원",
            "상가요양원",
            "주간보호센터"
        ],
    },
    {
        label:"정원수",
        type: "select",
        options: [
            "29",
            "35",
            "49",
            "59",
            "79",
            "99",
            "120",
        ]
    },
    {
        label:"현원수(일반병실)",
        type: "input",
        value: "0", 
        placeholder: "숫자 입력",
        readonly: false
    },
    {
        label:"현원수(상급병실)",
        type: "input",
        value: "0",
        placeholder: "숫자 입력",
        readonly: false
    },
    {
        label:"상급병실료(원/월)",
        type: "input",
        value: "0",
        placeholder: "금액 입력",
        readonly: false
    },
    {
        label:"추가 요양보호사",
        type: "input",
        value: "0",
        placeholder: "숫자 입력",
        readonly: false
    },
    {
        label:"예상 가산금(원/월)",
        type: "input",
        value: "0",
        placeholder: "숫자 입력",
        readonly: false
    },
    {
        label:"매매가(보증금)",
        type: "input",
        value: "0",
        placeholder: "자동 계산", 
        readonly: true,
    },
    {
        label:"대출금",
        type: "input",
        value: "0",
        placeholder: "자동 계산",
        readonly: true
    },
    {
        label: "월차임(주간보호)",
        type: "input",
        value: "0",
        placeholder: "자동 계산",
        readonly: true
    }
];

export const CAPACITY_AND_PRICE = [
    {
        item: "단독요양원",
        match: {
            "0" : "0",
            "29": "2,200,000,000",
            "35": "2,500,000,000",
            "49": "3,700,000,000",
            "59": "4,200,000,000",
            "79": "5,200,000,000",
            "99": "6,500,000,000",
            "120": "7,500,000,000"
        },
        loan: 0.8
    },
    {
        item: "상가요양원",
        match: {
            "0" : "0",
            "25": "1,600,000,000", 
            "29": "1,800,000,000",
            "35": "2,000,000,000",
            "49": "2,500,000,000",
            "59": "3,000,000,000",
            "79": "4,000,000,000",
            "99": "5,000,000,000",
            "120": "6,000,000,000 "
        },
        loan: 0.8
    },
    {
        item: "주간보호센터",
        match: {
            "0" : "0",
            "29": "30,000,000", 
            "39": "30,000,000", 
            "49": "50,000,000"
        },
        rent: {
            "0" : "0",
            "29": "2,300,000", 
            "39": "2,800,000", 
            "49": "3,500,000"
        }
    }
]


export const CALCULATOR_RESULT = {
    "수입":  [
        {
            item: "합계",
            calculate: (values = []) => {
                return  getLocalNumber(CALCULATOR.sum(values));
            }
        }, 
        {
            item: "공단지원금 80%",
            unit: 1666800,
            calculate: () => {

            }
        }, 
        {
            item: "본인부담금 20%", 
            unit: 416700,
        },
        {
            item: "식대",
            unit: 300000,
        },
        {
            item: "간식비",
            unit: 30000,

        },
        {
            item: "상급병실료",
        },
        {
            item: "가산금"
        }
    ],
    "지출": [
        {
            item: "합계",
            calculate: (values = []) => {
                return  getLocalNumber(CALCULATOR.sum(values));
            }
        },
        {
            item: "인건비",

        },
        {
            item: "시설장",
            unit: 3000000,
        },
        {
            item: "사무국장",
            unit: 2400000,
        },
        {
            item: "사회복지사",
            unit: 2300000,
        },
        {
            item: "간호사 (간호조무사)",
            unit: 2200000,
        },
        {
            item: "요양보호사",
            unit: 2200000,
        },
        {
            item: "물리치료사",
            unit: 2300000,
        },
        {
            item: "(촉탁)의사",
            unit: 0,
        },
        {
            item: "영양사",
            unit: 2400000,
        },
        {
            item: "조리원",
            unit: 2100000,
        },
        {
            item: "위생원",
            unit: 1800000,
        },
        {
            item: "사무원",
            unit: 2000000,
        },
        {
            item: "관리인",
            unit: 2100000,
        },
        {
            item: "인건비 외",
            unit: 0,
        },
        {
            item: "식재료비 / 간식비",
            unit: 8000,
        },
        {
            item: "관리비 (난방,전기,가스 외)",
            unit: 7500,
        },
        {
            item: "소모품비",
            unit: 30000,
        },
        {
            item: "기타비용",
            unit: 10000,
        },
        {
            item: "대출이자",
            unit: 0,
        },
        {
            item: "퇴직금/보험",
            unit: 0,
        }
    ],
    "월 수익": [
        {
            item: "",
            calculate: (values = []) => {
                return  getLocalNumber(CALCULATOR.sum(values));
            }
        }
    ]
};