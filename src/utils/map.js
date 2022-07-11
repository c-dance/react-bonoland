import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { ZOOMS } from '../scheme/map';
import jQuery from 'jquery';

const { naver } = window;

export const getZoomLevel = zoom => {
    let level= 'gugun';

    for(const key in ZOOMS) {
      if(zoom >= ZOOMS[key][0] && zoom < ZOOMS[key][1]) level = key;
    }
    
    return level;
};

export const getZoomByAddress = address => {
  let validAddress = address.filter(item => item.longName.length > 0);

  if(!validAddress) return ZOOMS.gugun[0]; // 디폴트값: 구군주소 레벨(읍면동 마커)

  if(validAddress.length >= 3 ) return ZOOMS.dong[0]; // 읍면동 주소(상세 마커)
  else if (validAddress.length <= 1) return ZOOMS.sido[0]; // 시도 주소(구군 마커)
  else return ZOOMS.gugun[0]; // 구군 주소(읍면동 마커)
};

export const getRegionByLatlng = latlng => {
    return new Promise((resolve, reject) => {
        naver.maps.Service.reverseGeocode({
            coords: new naver.maps.LatLng(latlng[0], latlng[1]),
            orders: [
              naver.maps.Service.OrderType.ADDR, // 법정동 주소만 받음
            ].join(',')
        }, (status, response) => {
            if(status === naver.maps.Service.Status.ERROR) reject("geocode오류");
            else if(response.v2.results.length <= 0) resolve('');
            else resolve(response.v2.results[0].region); // 법정동
        })
    })
};

export const getRegionByZoom = (regions, zoom) => {
    const level = getZoomLevel(zoom);
    let result = ``;
    if(regions && Object.keys(regions).length > 0) {
      if(level === 'gugun') result = `${regions.area1.name} ${regions.area2.name}`; // 구군 진입시 > 구군 주소
      if(level === 'dong') result = `${regions.area1.name} ${regions.area2.name} ${regions.area3.name}` //읍변동 진입시 > 읍면동 주소
    }
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
        if(data) {
          resolve({
            latlng: [parseFloat(data.y), parseFloat(data.x)],
            zoom: getZoomByAddress(data.addressElements),
            address: data.roadAddress
          });
        }
      });
  })
};

export const renderedGroupMarker = (data, map, onMarkerClick) => {

  const markers = data.map(item => {
    const latlng = [item.x, item.y];
    const total = item.totalCount;
    const address = item.area;
    let contents = '';

    contents += `<li>요양원 ${item['mallTotal'] + item['onlyTotal']}</li>`;
    contents += `<li>주간보호 ${item['centerTotal']}</li>`;

    const marker = new naver.maps.Marker({
      // position: new naver.maps.LatLng(item.latlng),
      position: new naver.maps.LatLng([item.y, item.x]),
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

    naver.maps.Event.addListener(marker, "click", () => { onMarkerClick({ latlng: latlng, zoom: ZOOMS[getZoomLevel(map.zoom)][1] }) });

    return marker;
    }
  )
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
          <button class="btn btn--details">상세</>
          <button class="btn btn--contact">문의</button>
      </div>
      <div class="info-window__tail"></div>
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
    const btnClicked = e.pointerEvent.path.filter(p => p.tagName === "BUTTON").length > 0;
    if(!btnClicked) {
      removeInfoWindow();
    } else {
      const mode =  e.pointerEvent.path.filter(p => p.tagName === "BUTTON")[0].className.split('btn--')[1];
      if(mode === "contact") props.onContactClick(props.data["ID"]);
      if(mode === "details") props.onDetailsClick(props.data["ID"]);
    }
  });

  naver.maps.Event.addListener(props.map, "click", () => { removeInfoWindow(); });
  naver.maps.Event.addListener(props.map, "dragend", () => { removeInfoWindow(); });

  return infoWindow;
};

export const removeMarkers = markers => {
  for(const marker of markers) {
    marker.setMap(null);
  }
  console.log('remove marker');
  return markers;
};

export const removeInfoWindow = infoWindow => {
  if(infoWindow) {
    infoWindow.setMap(null);
  }
  console.log('remove infowindow');
  return infoWindow;
}

const vworld = {
  key: '6F9F5377-D787-3135-8561-E9DBA3394C1A',
  url: 'http://api.vworld.kr/req/data?service=data&request=GetFeature&size=1000',
  service: {
    sido: {
      id: 'LT_C_ADSIDO_INFO',
      filter: 'ctp_kor_nm'
    },
    gugun: {
      id: '	LT_C_ADSIGG_INFO',
      filter: 'full_nm'
    },
    dong: {
      id: 'LT_C_ADEMD_INFO',
      filter: 'full_nm'
    },
  }
};

export const getGeoJson = (zoom, address) => {
  const zoomLevel = getZoomLevel(zoom);
  const url = `${vworld.url}&key=${vworld.key}&data=${vworld.service[zoomLevel].id}&attrFilter=${vworld.service[zoomLevel].filter}:=:${address}`;
  return jQuery.ajax(url, {
    type: 'GET',
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
    },
    error: function(request, error) {
      console.log(request, error);
    }
  });
};

export const renderDataLayer = (map, geoJson) => {
  const layer = map.data.addGeoJson(geoJson);
  return layer;
};

export const removeDataLayer = (map, layer) => {
  if(map && layer) map.data.removeGeoJson(layer);
};