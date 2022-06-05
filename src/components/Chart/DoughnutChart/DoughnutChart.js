import { Chart as ChartJs, ArcElement, Legend, Title, DoughnutController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MARKETS } from '../../../sheme/chart';
import { ChartBox } from './DoughnutChartStyle';
import 'chartjs-plugin-doughnut-innertext'
import { isBrowser } from 'react-device-detect';
import React from "react";


const doughnutColors = ['#fff', '#E4B251', '#7BF5BB', '#E98686', '#001f6099'];
const baseLen = 5;
const gap = { weight: 1 };
const getStyldedDatasets = (datasets) => {
    let newDatasets = [];

    let dummyCount = baseLen - datasets.length;

    if(dummyCount > 0) {
        let dummyArray = new Array(dummyCount).fill(Object.assign({}, datasets[1]));
        if(dummyCount > 0) datasets = datasets.concat(dummyArray);
    }

    for(let i = 0; i < datasets.length; i++) {
        newDatasets.push(datasets[i]);
        if(i < datasets.length -1) newDatasets.push(gap);
    };

    console.log(newDatasets);

    return newDatasets;
};

const DoughnutChart = ({ scheme, data, type }) => {
    
    ChartJs.register(ArcElement, Legend, Title, DoughnutController );

    //get data
    const dataScheme = MARKETS[scheme.toString()];
    const chartLabels = dataScheme.labels.map((item, idx) =>`${item}${data[idx]}명`);
    const chartTitle = dataScheme.title;
    const datasets = data.map((item, idx) => (
        {
            label: idx ===0 ? '' : chartLabels[idx - 1],
            data: idx===0? [Number(item)].concat(new Array(data.length - 2)) : [Number(item), Number(data[0]) - Number(item) ],
            backgroundColor: idx===0? doughnutColors : [doughnutColors[idx], 'transparent'],
            borderColor: 'transparent',
            borderRadius: idx===0? 0 : 30,  
            borderWidth: 3,
            weight: 3,
        }
    ));
    
    const styledDatasets = getStyldedDatasets(datasets);

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: {
                        size:14
                    },
                    usePointStyle: true,
                    boxWidth: ( type === "main" && isBrowser && 8 ) || 10,
                    lineWidth: 0,
                    padding: ( type === "main" && isBrowser && 15 ) || 20
                },
            },
            title: {
                display: true,
                text: ( type === "main" && `•  ${chartTitle}  • ` ) || chartTitle,
                position: 'top',
                padding: {
                    bottom: ( type === "main" && isBrowser && 10 ) || 20
                },
                color: '#fff',
                font: {
                    size: 16,
                    family: "'Noto Sans KR', Sans-serif"
                },
            }
        },
        cutout: (type === "main" && isBrowser && 50) || 70,
        radius: (type === "main" && isBrowser && 60) || 90,
        circumference: 360, 
        elements: {
            arc: {
                borderWidth: 10,
            }
        }, 
        centerText: {
            value: `총 \n ${data[0]}명`,
            color: '#FFF',
            fontSizeAdjust: -0.5
        },
        // responsive: true
    };

    return (
        <ChartBox type={ type || "" }>
            <Chart
                type="doughnut"
                data= {{
                    datasets: styledDatasets,
                    labels: chartLabels
                }} 
                options = { chartOptions }
            />
        </ChartBox>
    )
};

export default DoughnutChart;