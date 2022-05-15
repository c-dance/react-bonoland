import { Region } from './MapRegionStyle';

const MapRegion = ({region}) => (
    <Region 
        display={region.length > 0? 'block' : 'none'}
    >{ region }</Region>
);

export default MapRegion;