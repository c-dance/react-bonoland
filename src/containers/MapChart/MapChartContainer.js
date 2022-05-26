import { useSelector } from 'react-redux';
import { getZoomLevel } from '../../utils/map';

const MapChart = () => {

    let zoom = useSelector(state => state.Map.zoom );
    let isGugun = getZoomLevel(zoom) === 2;
    console.log(isGugun)

    return (
        <div>
            
        </div>
    )
};

export default MapChart;