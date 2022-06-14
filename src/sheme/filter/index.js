export const CATEGORY = {
    "단독요양원" : {
        label: "단독요양원",
        mobileLabel: "단독",
        value: "단독요양원",
        key: "bonoDandok"
    },
    "상가요양원": {
        label: "상가요양원",
        mobileLabel: "상가",
        value: "상가요양원",
        key: "bonoSanga"

    },
    "주간보호" : {
        label: "주간보호",
        mobileLabel: "주간",
        value: "주간보호",
        key: "bonoJugan"
    }
};

export const CAPACITY = [
    {
        label: "전체",
        value: [0, 10000]
    },
    {
        label: "0 ~ 29",
        value: [0, 29]
    },
    {
        label: "29 ~ 39",
        value: [29, 39]
    },
    {
        label: "39 ~ 59",
        value: [39, 59]
    },
    {
        label: "59 ~ 79",
        value: [59, 79]
    },
    {
        label: "79 ~ 99",
        value: [79, 99]
    },
    {
        label: "99",
        value: [99, 10000]
    }
]

export const TYPE_AND_MARKERS = {
    단독요양원: { 0: 0, 30: 30, 60: 60, 90: 90, 120: 120 },
    상가요양원: { 0: 0, 30: 30, 60: 60, 90: 90, 120: 120 },
    주간보호: { 0: 0, 10: 10, 20: 20, 30: 30, 40: 40, 49: 49 }
}

export const TYPE_AND_CAPACITY = {
    단독요양원: [{
        label: "전체",
        value: [0, 120]
    },
    {
        label: "0 ~ 29",
        value: [0, 29]
    },
    {
        label: "29 ~ 39",
        value: [29, 39]
    },
    {
        label: "39 ~ 59",
        value: [39, 59]
    },
    {
        label: "59 ~ 79",
        value: [59, 79]
    },
    {
        label: "79 ~ 99",
        value: [79, 99]
    },
    {
        label: "99 ~ 120",
        value: [99, 120]
    }], 
    상가요양원: [{
        label: "전체",
        value: [0, 120]
    },
    {
        label: "0 ~ 29",
        value: [0, 29]
    },
    {
        label: "29 ~ 39",
        value: [29, 39]
    },
    {
        label: "39 ~ 59",
        value: [39, 59]
    },
    {
        label: "59 ~ 79",
        value: [59, 79]
    },
    {
        label: "79 ~ 99",
        value: [79, 99]
    },
    {
        label: "99 ~ 120",
        value: [99, 120]
    }], 
    주간보호:  [{
        label: "전체",
        value: [0, 49]
    },
    {
        label: "0 ~ 29",
        value: [0, 29]
    },
    {
        label: "29 ~ 39",
        value: [29, 39]
    },
    {
        label: "39 ~ 49",
        value: [39, 49]
    }], 
}