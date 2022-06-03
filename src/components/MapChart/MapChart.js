import { Charts, Wrapper } from './MapChartStyle';
import React from "react";

const MapChart = ({ children }) => {
    return (
        <Charts>
            <Wrapper>
                { children }
            </Wrapper>
        </Charts>
    )
};

export default MapChart;