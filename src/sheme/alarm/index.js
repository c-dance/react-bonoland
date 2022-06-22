// export const REGIONS = {
//     경기도: {
//         김포파주고양: {
//             label: "김포, 파주, 고양",
//             value: false
//         },
//         부천광명시흥: {
//             label: "부천, 광명, 시흥",
//             value: false,
//         },
//         과천안양성남: {
//             label:  "과천, 안양, 성남",
//             value: false,
//         },
//         구리하남광주: {
//             label:  "구리, 하남, 광주",
//             value: false,
//         },
//         의정부양주남양주: {
//             label: "의정부, 양주, 남양주",
//             value: false,
//         },
//         안산군포의왕: {
//             label: "안산, 군포, 의왕",
//             value: false,
//         },
//         수원화성용인: {
//             label: "수원, 화성, 용인",
//             value: false,
//         },
//         오산평택안성: {
//             label: "오산, 평택, 안성",
//             value: false,
//         },
//         이천여주: {
//             label: "이천, 여주",
//             value: false,
//         },
//         가평양평: {
//             label: "가평, 양평",
//             value: false,
//         }
//     },
//     서울특별시: {
//         label: "서울특별시",
//         value: false
//     },
//     부산광역시: {
//         label: "부산광역시",
//         value: false
//     },
//     대구광역시: {
//         label: "대구광역시",
//         value: false
//     },
//     인천광역시: {
//         label: "인천광역시",
//         value: false
//     },
//     광주광역시: {
//         label: "광주광역시",
//         value: false
//     },
//     대전광역시: {
//         label: "대전광역시",
//         value: false
//     },
//     울산광역시: {
//         label: "울산광역시",
//         value: false
//     },
//     세종특별자치시: {
//         label: "세종특별자치시",
//         value: false
//     },
//     충청북도: {
//         label: "충청북도",
//         value: false
//     },
//     강원도: {
//         label: "강원도",
//         value: false
//     },
//     전라북도: {
//         label: "전라북도",
//         value: false
//     },
//     충청남도: {
//         label: "충청남도",
//         value: false
//     },
//     경상북도: {
//         label: "경상북도",
//         value: false
//     },
//     전라남도: {
//         label: "전라남도",
//         value: false
//     },
//     경상남도: {
//         label: "경상남도",
//         value: false
//     },
//     제주도: {
//         label: "제주도",
//         value: false
//     }
// }

export const REGIONS = {
    dataset: {
        경기도: {
            김포파주고양: {
                label: "김포, 파주, 고양",
                value: false
            },
            부천광명시흥: {
                label: "부천, 광명, 시흥",
                value: false,
            },
            과천안양성남: {
                label:  "과천, 안양, 성남",
                value: false,
            },
            구리하남광주: {
                label:  "구리, 하남, 광주",
                value: false,
            },
            의정부양주남양주: {
                label: "의정부, 양주, 남양주",
                value: false,
            },
            안산군포의왕: {
                label: "안산, 군포, 의왕",
                value: false,
            },
            수원화성용인: {
                label: "수원, 화성, 용인",
                value: false,
            },
            오산평택안성: {
                label: "오산, 평택, 안성",
                value: false,
            },
            이천여주: {
                label: "이천, 여주",
                value: false,
            },
            가평양평: {
                label: "가평, 양평",
                value: false,
            }
        },
        서울특별시: {
            label: "서울특별시",
            value: false
        },
        부산광역시: {
            label: "부산광역시",
            value: false
        },
        대구광역시: {
            label: "대구광역시",
            value: false
        },
        인천광역시: {
            label: "인천광역시",
            value: false
        },
        광주광역시: {
            label: "광주광역시",
            value: false
        },
        대전광역시: {
            label: "대전광역시",
            value: false
        },
        울산광역시: {
            label: "울산광역시",
            value: false
        },
        세종특별자치시: {
            label: "세종특별자치시",
            value: false
        },
        충청북도: {
            label: "충청북도",
            value: false
        },
        강원도: {
            label: "강원도",
            value: false
        },
        전라북도: {
            label: "전라북도",
            value: false
        },
        충청남도: {
            label: "충청남도",
            value: false
        },
        경상북도: {
            label: "경상북도",
            value: false
        },
        전라남도: {
            label: "전라남도",
            value: false
        },
        경상남도: {
            label: "경상남도",
            value: false
        },
        제주도: {
            label: "제주도",
            value: false
        }
    },
    objectToArray(regions) {
        if(Object.keys(regions).length < 0) regions = this.dataset;

        const data = Object.keys(regions).reduce((acc, key, idx) => {
            if(key === "경기도") {
                const gData = Object.keys(regions["경기도"]).reduce((gacc, key) => {
                    if(regions["경기도"][key].value) return gacc.concat([`경기도 ${regions["경기도"][key].label.split(" ").join("")}`]);
                    else return gacc;
                }, []);
                return acc.concat(gData);
            } else {
                if(regions[key].value) return acc.concat([key]);
                else return acc;
            }
        }, []);

        return data;
    },
    arrayToObject(data) {
        const initialRegion = this.dataset;
        let regions = initialRegion;

        if(Array.isArray(data)) {
            regions = data.reduce((acc, region) => {
                if(region.substring(0, 3) === "경기도") {
                    const regionKey = region.substring(4).trim().replaceAll(",", "");
                    const regionLabel = region.substring(4).trim().replaceAll(",", ", ");
                    const newRegion = { [regionKey] : { label: regionLabel, value: true} };
                    return {...acc, 경기도: {...acc["경기도"], ...newRegion}};
                } else {   
                    const newRegion = { [ region ]: { label: region, value: true } };
                    return {...acc, ...newRegion};
                } 
            }, initialRegion);
        }
        
        return regions;
    }
}
