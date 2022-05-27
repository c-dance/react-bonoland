import { Charts, Wrapper } from './MapChartStyle'

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