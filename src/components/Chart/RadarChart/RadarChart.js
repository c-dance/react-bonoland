import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, defaults } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { BONOSCORE } from '../../../scheme/chart';
import { ChartWrap, Average } from './RadarChartStyle';
import { isBrowser } from 'react-device-detect';
import React from "react";

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
                size: isBrowser? 16 : 20,
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
    },
    responsive: true
};

const BonoPlugin = {
    id: 'custom_canvas_background_color',
};

const RadarChart = ({ data }) => {

    ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler );
    defaults.font.family = "'Noto Sans KR', sans-serif";

    const chartLabels = BONOSCORE.labels;
    const chartDatasets = [{
        data: Object.keys(data).filter( key => key !== "점수").map(item => data[item]),
        borderWidth: 0,
        backgroundColor: 'rgba(0, 31, 96, 0.6)', 
        pointBackgroundColor: "transparent",
        pointBorderWidth: 0,
    }];
    const average = data["점수"];
    const chartOptions = Object.assign({}, radarOptions);
    // chartOptions.plugins.title.text = average.toString();

    return (
        <ChartWrap>
            <Average>{ average }</Average>
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