import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
    desktopL: "(max-width: 1920px)",
    desktopM: "(max-width: 1440px)",
    desktopS: "(max-width: 1240px)",
    tablet: "(max-width: 1024px)",
};

const BreakPoint = (props) => {
    const breakPoint = breakpoints[props.name] || breakpoints.desktopL;

    return (
        <MediaQuery {...props} query={breakPoint}>
            { props.children }
        </MediaQuery>
    );
};

export default BreakPoint;
