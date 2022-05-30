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
              <em style="opacity:0.7">${address}</em>
              <ul style="display:flex;flex-direction:column;;justify-content:center;align-items:center;gap:6px;font-weight:700">
                ${ contents.toString()}
              </ul>
          </div>
            <div style="position:absolute;top:0;left:50%;height:26px;line-height:26px;padding:0 12px;border-radius:13px;border:1px solid #3E468E;background-color:#fff;font-size:14px;transform:translateX(-50%)">
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

export const renderItemMarkers = (data, map) => {
  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(data.latlng),
    map: map, 
    icon: {
      content: [
        '<div>',
        '</div>'
      ].join(''),
      size: new naver.maps.Size(38, 58),
      anchor: new naver.maps.Point(19, 58)
    },
    draggable: false
  });

  var contentString = [
    '<div class="iw_inner">',
    '</div>'
  ].join('');

  var infowindow = new naver.maps.InfoWindow({
    content: contentString,
    maxWidth: 140,
    backgroundColor: "#eee",
    borderColor: "#2db400",
    borderWidth: 5,
    anchorSize: new naver.maps.Size(30, 30),
    anchorSkew: true,
    anchorColor: "#eee",
    pixelOffset: new naver.maps.Point(20, -20)
  });

  naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
  });

  return marker;
};

export const removeMarkers = markers => {
  for(const marker of markers) {
    marker.setMap(null);
  }
  return markers;
};