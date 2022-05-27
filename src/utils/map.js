const { naver } = window;

export const getZoomLevel = zoom => {
    let level = 0;

    if(zoom >= 16) level = 3; // 동, 상세
    else if(zoom < 16 && zoom >= 14) level = 2; // 구, 군
    else if(zoom < 14 && zoom >= 11) level = 1; // 시, 도
    else if(zoom < 11) level = 0; // 시도 이상(3km 이상)
    
    return level;
};

export const getRegionByLatlng = (latlng) => {
    return new Promise((resolve, reject) => {
        naver.maps.Service.reverseGeocode({
            coords: new naver.maps.LatLng(latlng[0], latlng[1]),
            orders: [
            //   naver.maps.Service.OrderType.ADDR,
            ].join(',')
        }, (status, response) => {
            if(status === naver.maps.Service.Status.ERROR) reject("geocode오류");
            else if(response.v2.results.length <= 0) reject("지역 이탈");
            else resolve(response.v2.results[1].region);
        })
    })
};

export const getRegionByZoom = (regions, zoom) => {
    const level = getZoomLevel(zoom);
    let result = '';

    if(level === 1) result = regions.area1.name; // 시도
    if(level === 2) result = `${regions.area1.name} ${regions.area2.name}`; // 구군
    if(level === 3) result = `${regions.area1.name} ${regions.area2.name} ${regions.area3.name}`; //읍면동

    return result;
};
