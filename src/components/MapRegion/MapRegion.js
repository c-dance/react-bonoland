import { Region } from './MapRegionStyle';
import React from "react";

const MapRegion = ({region}) => (
    <Region 
        display={region.length > 0? 'block' : 'none'}
    >{ region }</Region>
);

export default MapRegion;