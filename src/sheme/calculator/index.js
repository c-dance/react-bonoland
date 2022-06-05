export const CALCULATOR_FORM = [
    {
        label: "1. 요양시설 타입",
        type: "select",
        options: [
            "단독요양원",
            "상가요양원",
            "주간보호"
        ]
    },
    {
        label:"2. 정원수",
        type: "input",
        value: "0"
    },
    {
        label:"3. 현원수(일반병실)",
        type: "input",
        value: "0"
    },
    {
        label:"4. 현원수(상급병실)",
        type: "input",
        value: "0"
    },
    {
        label:"5. 상급병실료(원/월)",
        type: "input",
        value: "0"
    },
    {
        label:"6. 추가 요양보호사",
        type: "input",
        value: "0"
    },
    {
        label:"7. 조리원 유무",
        type: "select",
        options: [
            "유",
            "무"
        ]
    },
    {
        label:"8. 예상 가산금(원/월)",
        type: "input",
        value: "0"
    },
    {
        label:"9. 대출금",
        type: "input",
        value: "0"
    },
    {
        label: "10. 급수 선택",
        type: "select",
        options: [
            "1급",
            "2급",
            "3급",
            "4급",
            "5급",
            "6급",
            "7급",
            "8급",
            "9급"
        ]
    }
];

export const CALCULATOR_RESULT = {
    "수입":  [
        {
            item: "합계",
        }, 
        {
            item: "공단지원금 80%",
        }, 
        {
            item: "본인부담금 20%"
        },
        {
            item: "식대"
        },
        {
            item: "간식비"
        },
        {
            item: "상급병실료"
        },
        {
            item: "가산금"
        }
    ],
    "지출": [
        {
            item: "합계"
        },
        {
            item: "인건비"
        },
        {
            item: "시설장"
        },
        {
            item: "사무국장"
        },
        {
            item: "사회복지사"
        },
        {
            item: "간호사 (간호조무사)"
        },
        {
            item: "요양보호사"
        },
        {
            item: "물리치료사"
        },
        {
            item: "(촉탁)의사"
        },
        {
            item: "영양사"
        },
        {
            item: "조리원"
        },
        {
            item: "위생원"
        },
        {
            item: "사무원"
        },
        {
            item: "관리인"
        },
        {
            item: "인건비 외"
        },
        {
            item: "식재료비 / 간식비"
        },
        {
            item: "관리비 (난방,전기,가스 외)"
        },
        {
            item: "소모품비"
        },
        {
            item: "기타비용"
        },
        {
            item: "대출이자"
        },
        {
            item: "퇴직금/보험"
        }
    ],
    "월 수익": [
        {
            item: ""
        }
    ]
};