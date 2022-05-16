import styled from 'styled-components';

const breakPoints = {
    desktopL: "1920px",
    desktopM: "1440px",
    desktopS: "1240px",
    tablet: "1024px",
};

const device = {
    desktopL: `screen and (max-width: ${ breakPoints.desktopL })`,
    desktopM: `screen and (max-width: ${ breakPoints.desktopM })`,
    desktopS: `screen and (max-width: ${ breakPoints.desktopS })`,
    tablet: `screen and (max-width: ${ breakPoints.tablet })`
};

const colors = {
    primary: "#BD9369",
    primaryD: "#8b653e",
    secondary: "#001f60",
    secondaryL: "#3e468e",
    blue: "#2962FF",
    red: "#B71C1C",
    gray100:"#f4f4f4", 
    gray200:"#EEEEEE", 
    gray300:"#E0E0E0", 
    gray400:"#bdbdbd", 
    gray500:"#9E9E9E", 
    gray600:"#757575", 
    gray700:"#616161", 
    gray800:"#424242", 
    gray900:"#212121", 
};

const theme = {
    colors,
    device
};

export default theme;