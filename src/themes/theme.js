import styled from 'styled-components';

/* ===== VARIABLES ===== */
const fontSizes = {
    xl:'1.25rem',
    l: '1.125rem',
    base: '1rem',
    s: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem'
};

const fontWeights = {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700'
};

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

export const theme = {
    fontSizes,
    fontWeights,
    colors,
    device,
};
