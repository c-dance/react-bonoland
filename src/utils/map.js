import { isMobile } from 'react-device-detect';
import axios from 'axios';

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
        let result = null;

        if(data) {
          result = {
            latlng: [data.x, data.y],
            region: data.roadAddress,
            zoom: getZoomByAddress(data.addressElements)
          };
        }

        resolve(result);
      });
  })
};

export const renderedGroupMarker = (data, map, onMarkerClick) => {

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

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(item.latlng),
      map: map, 
      icon: {
        content: `
          <div class="gMarker">
            <div class="gMarker-box">
                <em class="gMarker-addr">${address}</em>
                <ul class="gMarker-infos">
                  ${ contents.toString().replaceAll(",", "")}
                </ul>
            </div>
            <div class="gMarker-total"> ${total} </div>
          </div>
        `
      },
      draggable: false
    });

    naver.maps.Event.addListener(marker, "click", () => { onMarkerClick(item.latlng) });

    return marker;
    }
  )

  console.log('add group markers');
  return markers;
};

export const renderItemMarkers = (data, map, onMarkerClick) => {

  const markers = data.map(item => {

    const date = item["거래일"];
    const price = item["거래가"];
    const bono = item["보노매물"];
    const latlng = item["latlng"];

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latlng),
      map: map, 
      icon: {
        content: `
          <div class="iMarker ${bono&&'bono'}">
            <div class="iMarker-box">
                <em class="iMarker-date">${date} 거래</em>
                <span class="iMarker-price">실거래가 ${price}}</span>
            </div>
            <div class="iMarker-tail"></sdiv>
          </div>
        `,
        // anchor: new naver.maps.Point(11, 35)
        anchor: new naver.maps.Point(0, 0)
      },
      draggable: false
    });
  
    naver.maps.Event.addListener(marker, "click", () => { onMarkerClick(latlng, item["ID"]) });

    return marker;
  });
  console.log('add item markers');
  return markers;
};

export const renderInfoWindow = props => {

  const latlng = props.data["latlng"];

  const windowTemplate = `
    <div class="info-window" style="">
      <div class="info-window__body">
          <div class="pic"><img src=${'sd'}/></div>
          <div class="conts">
              <div class="conts__badges">
                  <div class="badge badge--sales">분양</div>
                  <div class="badge badge--rcmd">추천</div>
                  <div class="badge badge--premium">프리미엄</div>
              </div>
              <span class="conts__addr">서울 특별시 강남구</span>
              <span class="conts__category">단독 요양원 79인</span>
          </div>
          <div class="infos">
              <span class="infos__price">매매가 46억</span>
              <span class="infos__capacity">면적 1평 / 인가 00인 시설</span>
          </div>
      </div>
      <div class="info-window__actions">
          <a href="/center/${props.data.id}/" onClick=${() => alert("상세")} class="btn btn--details">상세</a>
          <button class="btn btn--contact" onClick=${() => alert("문의합니다")}>문의</button>
      </div>
    </div>
  `;
  
  const radiusTemplate = `<div class="info-radius"></div>`;

  const infoWindow = new naver.maps.Marker({
    position: new naver.maps.LatLng(latlng),
    map: props.map,
    icon: {
      content: 
        isMobile? 
        `<div class="map-info">${radiusTemplate}</div>`
        : ` <div class="map-info">${radiusTemplate}${windowTemplate}</div>`
    },
    zIndex: isMobile? -1 : 90,
    draggable: false
  });

  const removeInfoWindow = () => {
    props.onCloseClick();
    infoWindow.setMap(null);
  };

  naver.maps.Event.addListener(infoWindow, "click", (e) => {
    const outerClicked = e.pointerEvent.path.filter(p => p.id === "infoWindow").length < 1;
    const btnClicked = e.pointerEvent.path.filter(p => p.className && p.className.includes("btn")).length > 0;
    if(outerClicked && !btnClicked) removeInfoWindow();
  });

  naver.maps.Event.addListener(props.map, "click", () => { removeInfoWindow(); });
  naver.maps.Event.addListener(props.map, "dragend", () => { removeInfoWindow(); });

  return infoWindow;
};

export const removeMarkers = markers => {
  for(const marker of markers) {
    marker.setMap(null);
  }
  console.log('clean markers');
  return markers;
};

export const removeInfoWindow = async infoWindow => {
  if(infoWindow) {
    infoWindow.setMap(null);
  }
  console.log('clean infowindow');
  return infoWindow;
}

export const getBoundary = async () => {
  const RESPONSE = await axios.post('https://sgisapi.kostat.go.kr/OpenAPI3/auth/javascriptAuth.json', {
    consumer_key: "4c6d59d02339420baa0c",
    consumer_secret: "b7fb326fb8fa4d93a030"
  });
  console.log(RESPONSE);
  console.log('boundary');
  // console.log(RESPONSE);
};