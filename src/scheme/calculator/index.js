import { CALCULATOR, getLocalNumber, getNumber } from "../../utils/number";

export const INCOME_DATASET = {
    type: "단독요양원",
    capacity: "29",
    commons: "",
    premiums: "",
    premiumPrice: "",
    helpers: "",
    penalty: "",
    price: "2,200,000,000",
    loan: "1,760,000,000",
    rent: ""
};

export const TYPE_AND_CAPACITY = {
    단독요양원: ["29", "35", "49", "59", "79", "99", "100"],
    상가요양원: ["25", "29", "35", "49", "59", "79", "99", "100"],
    주간보호센터: ["29", "39", "49"]
}

export const CAPACITY_AND_PRICE = {
    단독요양원 : {
        match: {
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
            "29": "30,000,000", 
            "39": "30,000,000", 
            "49": "50,000,000"
        },
        rent: {
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
            unitPrice: 2100000
        },
        {
            item: "인건비 외",
            unitPrice: 0,
        },
        {
            item: "식재료비 / 간식비",
            unitPrice: 8000
        },
        {
            item: "관리비 (난방,전기,가스 외)",
            unitPrice: 7500
        },
        {
            item: "소모품비",
            unitPrice: 30000
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
        식재료비: 3000,
        소모품비: 30000,
        기타비용: 10000
    }
};

export const CAPACITY_AND_EMPLOY = (type, count) => ({
    시설장: 1,
    사무국장: count >= 50? 1 : 0,
    사회복지사: (type === "주간보호센터" && count < 10)? 0 : 1 + parseInt(count/101),
    간호사: type === "주간보호센터"? 1 + parseInt(count / 40) :  Math.round(count / 25),
    요양보호사: type === "주간보호센터"? Math.round(count/7) : Math.ceil(count/2.5),
    물리치료사: count < 30? 0 : 1 + parseInt(count / 101),
    의사: 1,
    영양사: count >= 50? 1 : 0,
    조리원: type === "주간보호센터"? (1 + parseInt(count / 40)) : Math.round(count / 25),
    위생원: type === "주간보호센터"? ( count >= 50? 1 : 0) : (count < 30? 0 : 1 + parseInt(count / 101)),
    사무원: type === "주간보호센터"? ( count >= 25 ? 1 : 0 ) : ( count >= 50? 1 : 0 ),
    관리인: type === "주간보호센터"? ( count >= 10 ? 1 : 0 ) : ( count >= 50? 1 : 0 )
});

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
        unit: 5000,
        calc: capacity => Math.round(7.14 * 5000 * capacity)
    },
    상가요양원: {
        rate: 0.0714,
        unit: 7500,
        calc: capacity => Math.round(7.14 * 7500 * capacity)
    },
    주간보호센터: {
        rate: 0.27225,
        unit: 5000,
        calc: capacity => Math.round((27.225 * 5000) + (5000 * (capacity - 5) * 2))
    },
}

export const GET_INCOME_RESULT = dataset => {
    console.log(dataset);

    const currentCapacity = getNumber(dataset.commons) + getNumber(dataset.premiums);
    const INCOME = TYPE_AND_UNITS[dataset.type];
    const EXPENDITURE = TYPE_AND_EXPENDITURE[dataset.type];
    
    const EMPLOY = CAPACITY_AND_EMPLOY(dataset.type, currentCapacity);
    EMPLOY["요양보호사"] +=getNumber(dataset.helpers);

    const ADMIN_EXPENSE = TYPE_AND_ADMIN_EXPENSE[dataset.type].calc(getNumber(dataset.capacity));
    const RENT_EXPENSE = dataset.type === "주간보호센터"? getNumber(dataset.rent) : Math.round((getNumber(dataset.loan) * 0.035) / 12);
    
    const resultSet = {
        수입: {
            합계: {
                title: "합계",
                capacity: "",
                unitPrice: "",
                totalPrice: "0"
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
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(dataset.penalty)
            }
        },
        지출: {
            합계 : {
                title: "합계",
                capacity: "",
                unitPrice: "",
                totalPrice: "0"
            },
            인건비 : {
                title: "인건비",
                capacity: "",
                unitPrice: "",
                totalPrice: "0"
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
                memo: "주간보호센터 : 보조원(운전사)"
            },
            인건비외: {
                title: "인건비 외",
                capacity: "",
                unitPrice: "",
                totalPrice: "0"
            },
            식재료비: {
                title: "식재료비/간식비",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(TYPE_AND_EXPENDITURE[dataset.type]["식재료비"]),
                totalPrice: getLocalNumber(TYPE_AND_EXPENDITURE[dataset.type]["식재료비"] * currentCapacity * 30),
                memo: `1인당 ${getLocalNumber(TYPE_AND_EXPENDITURE[dataset.type]["식재료비"])}원/일`
            },
            관리비: {
                title: "관리비(냉난방, 전기, 가스 외)",
                capacity: dataset.capacity,
                unitPrice: getLocalNumber(TYPE_AND_ADMIN_EXPENSE[dataset.type].unit),
                totalPrice: getLocalNumber(ADMIN_EXPENSE),
                memo: `평당 ${getLocalNumber(TYPE_AND_ADMIN_EXPENSE[dataset.type].unit)}원`
            },
            소모품비: {
                title: "소모품비",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(EXPENDITURE["소모품비"]),
                totalPrice: getLocalNumber(EXPENDITURE["소모품비"] * currentCapacity),
                memo: `1인당 ${getLocalNumber(EXPENDITURE["소모품비"])}원`
            },
            기타비용: {
                title: "기타비용",
                capacity: currentCapacity,
                unitPrice: getLocalNumber(EXPENDITURE["기타비용"]),
                totalPrice: getLocalNumber(EXPENDITURE["기타비용"] * currentCapacity),
                memo: `1인당 ${getLocalNumber(EXPENDITURE["기타비용"])}원`
            },
            대출이자: {
                title: "대출이자(월차임)",
                capacity: "",
                unitPrice: dataset.rent,
                totalPrice: getLocalNumber(RENT_EXPENSE),
                memo: dataset.type === "주간보호센터"? "월임대료" : "N억 X 3.5% / 12개월"
            },
            퇴직금: {
                title: "퇴직금/보험",
                capacity: "",
                unitPrice: "",
                totalPrice: getLocalNumber(INSURANCE_EXPENSE),
                memo: `인건비 X 7.1% + ${getLocalNumber(TYPE_AND_INSURANCE[dataset.type].unit)}원/인`
            },
        },
        월수익: {
            title: "월수익",
            capacity: "",
            unitPrice: "",
            totalPrice: "0"
        }
    };

    
    // 총 수입 합계
    let TOTAL_INCOME = 0;
    Object.keys(resultSet["수입"]).map(key => { TOTAL_INCOME += getNumber(resultSet["수입"][key].totalPrice) });
    
    // 총 인건비
    let TOTAL_EMPLOY = 0;
    const EMPLOYMENT = Object.keys(EMPLOY_AND_SALARY);
    for(const emp of EMPLOYMENT) TOTAL_EMPLOY += getNumber(resultSet["지출"][emp].totalPrice)
    
    // 퇴직금, 보험
    let INSURANCE_EXPENSE = 0; // 퇴직금, 보험
    const PAY = dataset.type === "주간보호센터"? 130000 : 150000;
    INSURANCE_EXPENSE = Math.round(TOTAL_EMPLOY * 0.0707) + (PAY * currentCapacity);

    // 인건비 외
    let TOTAL_ETC = 0;
    const ETCS = ["식재료비", "관리비", "소모품비", "기타비용", "대출이자"];
    for(const etc of ETCS) TOTAL_ETC += getNumber(resultSet["지출"][etc].totalPrice);
    TOTAL_ETC += INSURANCE_EXPENSE //  관리비, 월차임, 퇴직금/보험
    
    
    resultSet["수입"]["합계"].totalPrice = getLocalNumber(TOTAL_INCOME);
    resultSet["지출"]["인건비"].totalPrice = getLocalNumber(TOTAL_EMPLOY);
    resultSet["지출"]["퇴직금"].totalPrice = getLocalNumber(INSURANCE_EXPENSE);
    resultSet["지출"]["인건비외"].totalPrice = getLocalNumber(TOTAL_ETC);
    resultSet["지출"]["합계"].totalPrice = getLocalNumber(TOTAL_EMPLOY + TOTAL_ETC);
    resultSet["월수익"].totalPrice = getLocalNumber(TOTAL_INCOME - (TOTAL_EMPLOY + TOTAL_ETC));

    return resultSet;
};
