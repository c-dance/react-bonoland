import Marks from "rc-slider/lib/Marks";
import { validateElement } from "react-modal/lib/helpers/ariaAppHider";
import infoIcon from '../assets/images/map/ico-infowindow.svg';

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

export const renderedGroupMarker = (data, map) => {

  const markers = data.map(item => {
    let address = '';
    let contents = [];
    let total = 0;
  
    Object.keys(item).forEach(key => {
      switch(key) {
        case "주소" : 
          address = item[key];
          break;
        case "latlng": 
          break;
        default: 
          contents.push(`<li>${key} ${item[key]}</li>`);
          total += Number(item[key]);
          break;
      }
    });

    return new naver.maps.Marker({
      position: new naver.maps.LatLng(item.latlng),
      map: map, 
      icon: {
        content: [`
        <div style="position:relative;display:inline-block;width:auto;">
          <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px;padding: 20px 12px 16px;border-radius:6px;background-color:#3E468E;color:#fff;font-size:13px;transform: translateY(13px);">
              <em style="opacity:0.7;white-space:nowrap">${address}</em>
              <ul style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px;font-weight:700;white-space:nowrap">
                ${ contents.toString()}
              </ul>
          </div>
            <div style="position:absolute;top:0;left:50%;height:26px;line-height:26px;padding:0 12px;border-radius:13px;border:1px solid #3E468E;background-color:#fff;font-size:14px;white-space:nowrap;transform:translateX(-50%)">
            ${total}
            </div>
        </div>
        `].join(',')
      },
      draggable: false
    });
    }
  )

  return markers;
};

export const renderItemMarkers = (data, map, callback) => {

  const markers = data.map(item => {

    const date = item["거래일"];
    const price = item["거래가"];
    const color = item["보노매물"]? '#8A653F' : '#3E468E';
    const latlng = item["latlng"];

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latlng),
      map: map, 
      icon: {
        content: `
          <div style="position:relative;z-index:90;display:inline-block;width:auto;">
            <div style="z-index:1;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px 12px;border-radius:8px;background-color:${color};color:#fff;">
                <em>${date} 거래</em>
                <span>실거래가 ${price}}</span>
            </div>
            <div style="z-index:-1;position:realtive;width:0;height:0;background:transparent;border-style:inset;border-width:8px 9px 8px 9px; border-color: ${color} transparent transparent ${color}; transform:translateY(-6px);"></sdiv>
          </div>
        `,
        // anchor: new naver.maps.Point(11, 35)
      },
      draggable: false
    });
  
    naver.maps.Event.addListener(marker, "click", () => {
      callback(item);
    });

    return marker;
  });
  
  return markers;
};

export const renderInfoWindow = (data, map) => {

  const latlng = data["latlng"];

  const infoWindow = new naver.maps.Marker({
    position: new naver.maps.LatLng(latlng),
    map: map,
    icon: {
      content: `
      <div style="z-index:90;position:relative; transform:translateY(-100px)">
        <div style="z-index:-1;position:absolute;top:50%;left:50%;transform: translate(-200px,-200px);width:400px;height:400px;border-radius:200px;background:red;opacity:0.2"></div>
          <div id="infoWindow" style="z-index:3;position:relative;display:flex;flex-direction:column;gap:24px;padding:16px 12px 36px;background:url(${infoIcon}) center / 100% 100% no-repeat;white-space:nowrap">
            <div style="display:flex;flex-direction:column;gap:12px;">
                <div style="display:flex;flex-direction:column;gap:8px;">
                    <div style="display:flex;gap:6px;">
                        <div style="height:20px;line-height:20px;padding:0 8px;background:#B68B39;color:#fff;border-radius:2px;font-size:12px;font-weight:500">분양</div>
                        <div style="height:20px;line-height:20px;padding:0 8px;background:#E91E63;color:#fff;border-radius:2px;font-size:12px;font-weight:500">추천</div>
                        <div style="height:20px;line-height:20px;padding:0 8px;background:#4CAF50;color:#fff;border-radius:2px;font-size:12px;font-weight:500">프리미엄</div>
                    </div>
                    <span style="font-weight:500;color:#212121;">서울 특별시 강남구</span>
                    <span style="font-size:14px;color:#212121;">단독 요양원 79인</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <span style="font-weight: 700;color:#2962FF;">매매가 46억</span>
                    <span style="font-size: 12px;color:#757575;line-height: 1.3;">면적 1평 / 인가 00인 시설</span>
                </div>
            </div>
            <div style="display:flex;gap:12px;">
                <button style="flex: 1;height:24px;line-height:22px;border:1px solid #eee;font-size:13px;color:#424242;text-align:center;background:#fff;">상세</button>
                <button style="flex: 1;height:24px;line-height:22px;border:1px solid #eee;font-size:13px;color:#424242;text-align:center;background:#fff;">문의</button>
            </div>
          </div>
        </div>
      `
    },
    draggable: false
  });

  naver.maps.Event.addListener(infoWindow, "click", (e) => {
    const outerClicked = e.pointerEvent.path.filter(p => p.id === "infoWindow").length < 1;
    if(outerClicked) infoWindow.setMap(null);
  });

  naver.maps.Event.addListener(map, "click", () => {
    infoWindow.setMap(null);
  });

  return infoWindow;
};

export const removeMarkers = markers => {
  for(const marker of markers) {
    marker.setMap(null);
  }
  return markers;
};

export const removeInfoWindow = async infoWindow => {
  if(infoWindow) {
    infoWindow.setMap(null);
  }
  return infoWindow;
}