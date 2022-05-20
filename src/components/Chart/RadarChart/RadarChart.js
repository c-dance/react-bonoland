import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, defaults } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { BONOSCORE } from '../../../sheme/chart';
import { ChartWrap } from './RadarChartStyle';

const radarOptions = {
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: '',
            position: "top",
            align: "start",
            color: '#212121',
            font: {
                size: 20,
                family: "'Noto Sans KR', Sans-serif"
            },
        }
    }, 
    elements: {
        line: {
            borderWidth: 3,
            borderColor:'#757575'
        }
    }, 
    scales: {
        r: {
            pointLabels: {
                font: {
                    size: 16
                },
                color: '#212121',
                padding: 20
            },
            ticks: {
                display: false, 
            },
            gridLines: {
                display: true,
                color: ['#000','#000','#000']
            }
        }
    }, 
    scale: {
        min: 0,
        max: 100,
        beginAtZero: true,
        stepSize: 25
    }
};

const BonoPlugin = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
        console.log('hello');
    }
};

const RadarChart = ({ scheme, data }) => {

    ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler );
    defaults.font.family = "'Noto Sans KR', sans-serif";

    const chartLabels = BONOSCORE.labels;
    const chartDatasets = [{
        data: data,
        borderWidth: 0,
        backgroundColor: 'rgba(0, 31, 96, 0.6)', 
        pointBackgroundColor: "transparent",
        pointBorderWidth: 0,
    }];
    const average = 80;
    const chartOptions = Object.assign({}, radarOptions);
    chartOptions.plugins.title.text = average.toString();

    return (
        <ChartWrap>
            <Radar
                options={ radarOptions }
                data = {{
                    labels: chartLabels,
                    datasets: chartDatasets
                }}
                plugins={ BonoPlugin }
            />
        </ChartWrap>
    )
};

export default RadarChart;