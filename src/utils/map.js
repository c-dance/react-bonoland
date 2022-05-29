import Marks from "rc-slider/lib/Marks";
import { validateElement } from "react-modal/lib/helpers/ariaAppHider";

const { naver } = window;

export const getZoomLevel = zoom => {
    let level = 0;

    if(zoom >= 16) level = 3; // 동, 상세
    else if(zoom < 16 && zoom >= 14) level = 2; // 구, 군
    else if(zoom < 14 && zoom >= 11) level = 1; // 시, 도
    else if(zoom < 11) level = 0; // 시도 이상(3km 이상)
    
    return level;
};

export const getZoomByAddress = address => {
  let validAddress = address.filter(item => item.longName.length > 0);

  if(!validAddress) return 14;

  if(validAddress.length >= 3 ) return 16; // 동, 상세
  else if (validAddress.length <= 1) return 11; // 시, 도
  else return 14; // 구, 군
};

export const getRegionByLatlng = latlng => {
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

export const getSearchByAddress = address => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.geocode({
        query: address
      }, (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
            console.log(`검색 오류, address: ${ address? address : 'none' }`);
            reject(null);
        }
    
        if (response.v2.meta.totalCount === 0) {
            console.log('검색 결과 없음');
            reject(null);
        }
        
        const data = response.v2.addresses[0];
        const result = {
          latlng: [data.x, data.y],
          region: data.roadAddress,
          zoom: getZoomByAddress(data.addressElements)
        };
        resolve(result);
      });
  })
};

export const renderedGroupMarker = (data, map) => (
  new naver.maps.Marker({
    position: new naver.maps.LatLng(data.latlng),
    map: map
  })
);

export const renderItemMarkers = (data, map) => {
  let markers = new Array(Object.keys(data).length);

  return markers;
};

export const removeMarkers = markers => {
  console.log(markers);
  markers.map(item => item.setMap(null));
};