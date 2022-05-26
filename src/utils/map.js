export const getZoomLevel = zoom => {
    let level = 0;

    if(zoom >= 16) level = 3; // 동, 상세
    else if(zoom < 16 && zoom >= 14) level = 2; // 구, 군
    else if(zoom < 14 && zoom >= 11) level = 1; // 시, 도
    else if(zoom < 11) level = 0; // 시도 이상(3km 이상)
    
    return level;
}