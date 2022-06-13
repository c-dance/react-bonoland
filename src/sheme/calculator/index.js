import { CALCULATOR, getLocalNumber, getNumber } from "../../utils/number";

export const INCOME_DATASET = {
    type: "단독요양원",
    capacity: "0",
    commons: "0",
    premiums: "0",
    premiumPrice: "0",
    helpers: "0",
    penalty: "0",
    price: "0",
    loan: "0",
    rent: "0"
};

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

export const CAPACITY_AND_PRICE = {

    단독요양원 : {
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
    상가요양원 :  {
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
    주간보호센터 : {
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
};


export const INCOME_RESULT = {
    "수입":  [
        {
            item: "합계",
            capacity: "0",
            unitPrice: 0,
            totalPrice: "0",
            calculate: (values = []) => {
                return  getLocalNumber(CALCULATOR.sum(values));
            }
        }, 
        {
            item: "공단지원금 80%",
            unitPrice: 1666800,
            capacity: "0",
            totalPrice: "0",
            calculate: () => {

            }
        }, 
        {
            item: "본인부담금 20%", 
            unitPrice: 416700,
        },
        {
            item: "식대",
            unitPrice: 300000,
        },
        {
            item: "간식비",
            unitPrice: 30000,

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
            unitPrice: 3000000,
        },
        {
            item: "사무국장",
            unitPrice: 2400000,
        },
        {
            item: "사회복지사",
            unitPrice: 2300000,
        },
        {
            item: "간호사 (간호조무사)",
            unitPrice: 2200000,
        },
        {
            item: "요양보호사",
            unitPrice: 2200000,
        },
        {
            item: "물리치료사",
            unitPrice: 2300000,
        },
        {
            item: "(촉탁)의사",
            unitPrice: 0,
        },
        {
            item: "영양사",
            unitPrice: 2400000,
        },
        {
            item: "조리원",
            unitPrice: 2100000,
        },
        {
            item: "위생원",
            unitPrice: 1800000,
        },
        {
            item: "사무원",
            unitPrice: 2000000,
        },
        {
            item: "관리인",
            unitPrice: 2100000,
        },
        {
            item: "인건비 외",
            unitPrice: 0,
        },
        {
            item: "식재료비 / 간식비",
            unitPrice: 8000,
        },
        {
            item: "관리비 (난방,전기,가스 외)",
            unitPrice: 7500,
        },
        {
            item: "소모품비",
            unitPrice: 30000,
        },
        {
            item: "기타비용",
            unitPrice: 10000,
        },
        {
            item: "대출이자",
            unitPrice: 0,
        },
        {
            item: "퇴직금/보험",
            unitPrice: 0,
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

export const TYPE_AND_UNITS = {
    단독요양원: {
        공단지원금: 1666800,
        본인부담금: 416700,
        식대: 300000,
        간식비: 30000,
    },
    상가요양원: {
        공단지원금: 1666800,
        본인부담금: 416700,
        식대: 300000,
        간식비: 30000,
    },
    주간보호센터: {
        공단지원금: 984512,
        본인부담금: 173737,
        식대: 138000,
        간식비: 23000,
    }
};

export const TYPE_AND_EXPENDITURE = {
    단독요양원: {
        식재료비: 8000,
        소모품비: 30000,
        기타비용: 10000
    },
    상가요양원: {
        식재료비: 8000,
        소모품비: 30000,
        기타비용: 10000
    },
    주간보호센터: {
        식재료비: 8000,
        소모품비: 30000,
        기타비용: 10000
    }
};

export const CAPACITY_AND_EMPLOY = {
    29: {
        시설장: 1,
        사무국장: 0,
        사회복지사: 1,
        간호사: 1,
        요양보호사: 12,
        물리치료사: 0,
        의사: 1,
        영양사: 0,
        조리원: 1,
        위생원: 0,
        사무원: 0,
        관리인: 0
    },
    35: {
        시설장: 1,
        사무국장: 0,
        사회복지사: 1,
        간호사: 1,
        요양보호사: 14,
        물리치료사: 1,
        의사: 1,
        영양사: 0,
        조리원: 1,
        위생원: 0,
        사무원: 0,
        관리인: 0
    },
    49: {
        시설장: 1,
        사무국장: 0,
        사회복지사: 1,
        간호사: 2,
        요양보호사: 20,
        물리치료사: 1,
        의사: 1,
        영양사: 0,
        조리원: 2,
        위생원: 1,
        사무원: 0,
        관리인: 0
    },
    58: {
        시설장: 1,
        사무국장: 1,
        사회복지사: 1,
        간호사: 2,
        요양보호사: 23,
        물리치료사: 1,
        의사: 1,
        영양사: 1,
        조리원: 2,
        위생원: 1,
        사무원: 1,
        관리인: 1
    },
    99: {
        시설장: 1,
        사무국장: 1,
        사회복지사: 1,
        간호사: 4,
        요양보호사: 40,
        물리치료사: 1,
        의사: 1,
        영양사: 1,
        조리원: 4,
        위생원: 1,
        사무원: 1,
        관리인: 1
    },
    120: {
        시설장: 1,
        사무국장: 1,
        사회복지사: 2,
        간호사: 5,
        요양보호사: 48,
        물리치료사: 2,
        의사: 1,
        영양사: 1,
        조리원: 5,
        위생원: 2,
        사무원: 1,
        관리인: 1
    },
};

export const EMPLOY_AND_SALARY = {
    시설장: {
        단독요양원: 3000000,
        상가요양원: 3000000,
        주간보호센터: 2700000,
    },
    사무국장: 2400000,
    사회복지사: 2300000,
    간호사: 2200000,
    요양보호사: 2200000,
    물리치료사: 2300000,
    의사: 0,
    영양사: 2400000,
    조리원: 2100000,
    위생원: 1800000,
    사무원: 2000000,
    관리인: {
        단독요양원: 2100000,
        상가요양원: 2100000,
        주간보호센터: 1600000
    }
};

export const TYPE_AND_INSURANCE = {
    단독요양원: {
        rate: 0.71,
        unit: 150000
    },
    상가요양원: {
        rate: 0.71,
        unit: 150000
    },
    주간보호센터: {
        rate: 0.71,
        unit: 130000
    },
};

export  const TYPE_AND_ADMIN_EXPENSE = {
    단독요양원: {
        rate: 0.0714,
        unit: 7500,
        calc: capacity => Math.round(0.0714 * 7500 * capacity) * 100
    },
    상가요양원: {
        rate: 0.0714,
        unit: 7500,
        calc: capacity => Math.round(0.0714 * 7500 * capacity) * 100
    },
    주간보호센터: {
        rate: 0.27225,
        unit: 5000,
        calc: capacity => Math.round((0.27225 * 5000) + (5000 * (capacity - 5) * 2)) * 100
    },
}

export const GET_INCOME_RESULT = dataset => {

    const currentCapacity = getNumber(dataset.commons) + getNumber(dataset.premiums);
    const INCOME = TYPE_AND_UNITS[dataset.type];
    const EXPENDITURE = TYPE_AND_EXPENDITURE[dataset.type];
    
    const EMPLOY_NUM = Object.keys(CAPACITY_AND_EMPLOY).filter(key => key <= currentCapacity).length;
    const EMPLOY = CAPACITY_AND_EMPLOY[Object.keys(CAPACITY_AND_EMPLOY)[EMPLOY_NUM]];
    EMPLOY["요양보호사"] = parseInt(currentCapacity / 2.5);

    const ADMIN_EXPENSE = TYPE_AND_ADMIN_EXPENSE[dataset.type].calc(getNumber(dataset.capacity));
    const RENT_EXPENSE = Math.round((getNumber(dataset.loan) * 0.035) / 12);
    let INSURANCE_EXPENSE = 0;

    let TOTAL_INCOME = 0;
    let TOTAL_EMPLOY = 0;
    let TOTAL_EXPENDITURE = 0;
    let TOTAL_NOT_EMPLOY = 0;
    let TOTAL_INCOME_PER_MONTH = 0;
    
    /* TOTAL_INCOME */
    Object.keys(INCOME).map(key => { TOTAL_INCOME += INCOME[key] * currentCapacity; });
    TOTAL_INCOME += getNumber(dataset.premiumPrice) * getNumber(dataset.premiums); // 상급병실료

    /* TOTAL_EMPLOY */
    Object.keys(EMPLOY).map(key => { 
        if(key === "시설장" || key === "관리인") TOTAL_EMPLOY += EMPLOY_AND_SALARY[key][dataset.type] * EMPLOY[key];
        else TOTAL_EMPLOY += EMPLOY_AND_SALARY[key] * EMPLOY[key];
    });


    
    /* TOTAL_NOT_EMPLOY */
    Object.keys(EXPENDITURE).map(key => {
        if(key === "식재료비") TOTAL_NOT_EMPLOY += EXPENDITURE[key] * currentCapacity * 30;
        else TOTAL_NOT_EMPLOY += EXPENDITURE[key] * currentCapacity;
    });
    INSURANCE_EXPENSE = Math.round(TOTAL_EMPLOY * 0.0707) + (150000*currentCapacity);
    TOTAL_NOT_EMPLOY += ADMIN_EXPENSE + RENT_EXPENSE + INSURANCE_EXPENSE //  관리비, 월차임, 퇴직금/보험

    /* TOTAL_EXPENDITURE */
    TOTAL_EXPENDITURE = TOTAL_EMPLOY + TOTAL_NOT_EMPLOY;
    TOTAL_INCOME_PER_MONTH = TOTAL_INCOME - TOTAL_EXPENDITURE;

    const resultSet = {
        수입: {
            합계: {
                title: "합계",
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(TOTAL_INCOME)
            },
            공단지원금: {
                title: "공단지원금 80%",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(INCOME["공단지원금"]),
                totalPrice: getLocalNumber(INCOME["공단지원금"] * currentCapacity)
            },
            본인부담금: {
                title: "본인부담금 20%",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(INCOME["본인부담금"]),
                totalPrice: getLocalNumber(INCOME["본인부담금"] * currentCapacity)
            },
            식대: {
                title: "식대",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(INCOME["식대"]),
                totalPrice: getLocalNumber(INCOME["식대"] * currentCapacity)
            },
            간식비: {
                title: "간식비",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(INCOME["간식비"]),
                totalPrice: getLocalNumber(INCOME["간식비"] * currentCapacity)
            },
            상급병실료: {
                title: "상급병실료",
                capacity: currentCapacity,
                unitPrice: dataset.premiumPrice ,
                totalPrice: getLocalNumber(getNumber(dataset.premiumPrice) * getNumber(dataset.premiums))
            },
            가산금: {
                title: "가산금",
                capacity: currentCapacity,
                unitPrice: dataset.penalty,
                totalPrice: dataset.penalty
            }
        },
        지출: {
            합계 : {
                title: "합계",
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(TOTAL_EXPENDITURE)
            },
            인건비 : {
                title: "인건비",
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(TOTAL_EMPLOY)
            },
            시설장: {
                title: "시설장",
                capacity: EMPLOY["시설장"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["시설장"][dataset.type]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["시설장"][dataset.type] * EMPLOY["시설장"]),
            },
            사무국장: {
                title: "사무국장",
                capacity: EMPLOY["사무국장"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["사무국장"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["사무국장"] * EMPLOY["사무국장"]),
            },
            사회복지사: {
                title: "사회복지사",
                capacity: EMPLOY["사회복지사"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["사회복지사"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["사회복지사"] * EMPLOY["사회복지사"]),
            },
            간호사: {
                title: "간호(조무)사",
                capacity: EMPLOY["간호사"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["간호사"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["간호사"] * EMPLOY["간호사"]),
            },
            요양보호사: {
                title: "요양보호사",
                capacity: EMPLOY["요양보호사"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["요양보호사"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["요양보호사"] * EMPLOY["요양보호사"]),
            },
            물리치료사: {
                title: "물리치료사",
                capacity: EMPLOY["물리치료사"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["물리치료사"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["물리치료사"] * EMPLOY["물리치료사"]),
            },
            의사: {
                title: "(촉탁)의사",
                capacity: EMPLOY["의사"],
                unitPrice: "",
                totalPrice: "",
            },
            영양사: {
                title: "영양사",
                capacity: EMPLOY["영양사"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["영양사"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["영양사"] * EMPLOY["영양사"]),
            },
            조리원: {
                title: "조리원",
                capacity: EMPLOY["조리원"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["조리원"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["조리원"] * EMPLOY["조리원"]),
            },
            위생원: {
                title: "위생원",
                capacity: EMPLOY["위생원"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["위생원"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["위생원"] * EMPLOY["위생원"]),
            },
            사무원: {
                title: "사무원",
                capacity: EMPLOY["사무원"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["사무원"]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["사무원"] * EMPLOY["사무원"]),
            },
            관리인: {
                title: "관리인",
                capacity: EMPLOY["관리인"],
                unitPrice: getLocalNumber(EMPLOY_AND_SALARY["관리인"][dataset.type]),
                totalPrice: getLocalNumber(EMPLOY_AND_SALARY["관리인"][dataset.type] * EMPLOY["관리인"]),
            },
            인건비외: {
                title: "인건비 외",
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(TOTAL_NOT_EMPLOY)
            },
            식재료비: {
                title: "식재료비/간식비",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(EXPENDITURE["식재료비"]),
                totalPrice: getLocalNumber(EXPENDITURE["식재료비"] * currentCapacity * 30),
            },
            관리비: {
                title: "관리비(냉난방, 전기, 가스 외)",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(TYPE_AND_ADMIN_EXPENSE[dataset.type].unit),
                totalPrice: getLocalNumber(ADMIN_EXPENSE),
            },
            소모품비: {
                title: "소모품비",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(EXPENDITURE["소모품비"]),
                totalPrice: getLocalNumber(EXPENDITURE["소모품비"] * currentCapacity),
            },
            기타비용: {
                title: "기타비용",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(EXPENDITURE["기타비용"]),
                totalPrice: getLocalNumber(EXPENDITURE["기타비용"] * currentCapacity),
            },
            대출이자: {
                title: "대출이자(월차임)",
                capacity: "",
                unitPrice: dataset.rent,
                totalPrice: getLocalNumber(RENT_EXPENSE),
            },
            퇴직금: {
                title: "퇴직금/보험",
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(INSURANCE_EXPENSE),
            },
        },
        월수익: {
            title: "월수익",
            capacity: "",
            unitPrice: "",
            totalPrice: getLocalNumber(TOTAL_INCOME_PER_MONTH)
        }
    };

    return resultSet;
};
