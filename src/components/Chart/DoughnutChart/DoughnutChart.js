import { Chart as ChartJs, ArcElement, Legend, Title, DoughnutController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MARKETS } from '../../../sheme/chart';
import { ChartBox } from './DoughnutChartStyle';
import 'chartjs-plugin-doughnut-innertext'


const doughnutColors = ['#fff', '#E4B251', '#7BF5BB', '#E98686', '#001f6099'];
const doughnutOptions = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: '#fff',
                font: {
                    size: 14
                },
                usePointStyle: true,
                boxWidth: 10,
                lineWidth: 0,
                padding: 20
            },
        },
        title: {
            display: true,
            text: '',
            position: 'top',
            padding: {
                bottom: 20
            },
            color: '#fff',
            font: {
                size: 16,
                family: "'Noto Sans KR', Sans-serif"
            },
        }
    },
    cutout: 70,
    radius: 90,
    circumference: 360, 
    elements: {
        arc: {
            borderWidth: 10,
        }
    }, 
    centerText: {
        value: '',
        color: '#FFF',
        fontSizeAdjust: -0.5
    }
}


const DoughnutChart = ({ scheme, data }) => {

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
            borderWidth: 2,
        }
    ));
    const chartOptions = Object.assign({}, doughnutOptions);
    chartOptions.plugins.title.text = chartTitle;
    chartOptions.centerText.value = `총 \n ${data[0]}명`;


    return (
        <ChartBox>
            <Chart
                type="doughnut"
                data= {{
                    datasets: datasets,
                    labels: chartLabels
                }} 
                options = { chartOptions }
            />
        </ChartBox>
    )
};

export default DoughnutChart;