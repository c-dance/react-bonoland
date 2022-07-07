import { Chart as ChartJs, ArcElement, Legend, Title, DoughnutController, plugins } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartBox } from './DoughnutChartStyle';
import { isBrowser } from 'react-device-detect';
import React from "react";
import { getLocalNumber } from '../../../utils/number';

const doughnutColors = ['#E4B251', '#7BF5BB', '#E98686', '#616161', '#fff'];
const labelColors = ['transparent', '#fff', '#E4B251', '#7BF5BB', '#E98686', '#616161'];
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

    return newDatasets;
};

const getMinData = (data) => {
    let dummyCount = baseLen - Object.keys(data).length;
    for(let i = 0; i < dummyCount; i++) {
        data[`dummy${i}`] = "";
    };
    return data;
}; 

const getLabels = data => {
    let labels = Object.keys(data)
                    .filter((key) => key !== "합계" && !key.includes("dummy") )
                    // .filter((key) => !key.includes("dummy") )
                    .map( key => {
                        if(key === "합계") return "";
                        else return `${key}  ${getLocalNumber(data[key])}`
                    });
    return labels;
}; 

const DoughnutChart = ({ data, type }) => {
    
    ChartJs.register(ArcElement, Legend, Title, DoughnutController);
    ChartJs.register({
        id: 'afterDraw',
        afterDraw: (chart, args, options) => {
            if(!chart.config.options.subTitle) return;

            const current = chart.ctx;
            const cx = chart.width/2;
            const cy = chart.height/2;
            const canvas = chart.canvas;

            current.textAlign = 'center';
            current.textBaseline = 'middle';
            current.font = "16px 'NotoSans KR', sans-serif";
            current.fillStyle = "#ffffff";

            // current.fillText(chart.config.options.subTitle.main, cx, cy - 10);
            // current.fillText(chart.config.options.subTitle.sub, cx, cy + 10);
            current.fillText(chart.config.options.subTitle.main, cx, cy - 40);
            current.fillText(chart.config.options.subTitle.sub, cx, cy - 15);
            current.fillText(chart.config.options.plugins.title.text, cx, 20);
            chart.config.options.customLabels.forEach((label, idx) => {
                console.log(label);
                const x = (idx%2 > 0)? cx - 80 :  cx + 40;
                const y = 300 + (idx<2?0 : 1)*30;
                current.fillStyle = '#FFFFFF';
                current.textAlign = 'left';
                current.font = "14px 'NotoSans KR', sans-serif";
                current.fillText(label.text, x, y);

                current.beginPath();
                current.arc(x-14, y, 6, 0, Math.PI * 2);
                current.fillStyle = label.color;
                current.fill();
            })

            current.restore();
            current.save();
        }
    });

    //get data
    const chartTitle = data.title;
    const chartLabels = data.labels;

    const datasets = Object.keys(getMinData(data.dataset)).map((key, idx) => ({
        label: (key === "합계" || key.includes("dummy")) ? "" : key,
        data: key === "합계"? new Array(Object.keys(data.dataset).length - 1).fill(0).concat(Number(data.dataset[key])) : [Number(data.dataset[key]), Number(data.dataset["합계"]) - Number(data.dataset[key]) ],
        backgroundColor: key === "합계" ? doughnutColors : [doughnutColors[idx-1], 'transparent'],
        borderColor: 'transparent',
        borderRadius: idx===0? 0 : 30,  
        borderWidth: 3,
        weight: 3,
    }));
    
    const styledDatasets = getStyldedDatasets(datasets);

    const chartOptions = {
        customLabels: data.customLabels,
        subTitle: {
            main: data.chartTitle.main,
            sub: data.chartTitle.sub
        },
        layout: {
            autoPadding: false,
            padding: {

                top: 0,
                bottom: 0,
            }
        },
        plugins: {
            afterDraw: true,
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: {
                        size: ( type === "main" && isBrowser && 13 ) || 14,
                    },
                    usePointStyle: true,
                    boxWidth: ( type === "main" && isBrowser && 6 ) || 8,
                    lineWidth: 0,
                    padding: ( type === "main" && isBrowser && 12 ) || 20
                },
            },
            title: {
                display: false,
                text: ( type === "main" && `•  ${chartTitle}  • ` ) || chartTitle,
                position: 'top',
                padding: {
                    autoPadding: false,
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
        // radius: (type === "main" && isBrowser && 70) || 90,
        radius: (type === "main" && isBrowser && 90) || 90,
        circumference: 370, 
        elements: {
            arc: {
                borderWidth: 13,
            }
        }, 
        scales: {

        }
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