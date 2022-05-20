import { Chart as chartJs, ArcElement, Legend, Title, DoughnutController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import helpers from 'chart.js/helpers';

const doughnutColors = ['#fff', '#E4B251', '#7BF5BB', '#E98686'];
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
                bottom: 15
            },
            color: '#fff',
            font: {
                size: 16,
            },
        },
    }
}


const DoughnutChart = ({ scheme, data }) => {

    chartJs.register(ArcElement, Legend, Title, DoughnutController );


    const labels = [ '고령', '남자', '여자' ]; // shcheme keys

    const datasets = data.map((item, idx) => (
        {
            data: [Number(data)],
            backgroundColor: [doughnutColors[idx], 'transparent'],
            borderColor: []
        }
    ));

    console.log(datasets);

    doughnutOptions.plugins.title.text = scheme;




    const dataset = {
        labels: labels,
        datasets: [
            {
                data: [345],
                backgroundColor: [ '#fff'],
                borderColor: ['transparent'],
            },
            {
                data: [56, (345-56)],
                backgroundColor: [ '#E4B251', 'transparent' ],
                borderColor: ['transparent', 'transparent'],
                borderRadius: 30
            },
            {
                data: [345, (345-32)],
                backgroundColor: [ '#7BF5BB', 'transparent' ],
                borderColor:['transparent', 'transparent'],
                borderRadius: 30
            },
            {
                data: [24, (345-24)],
                backgroundColor: [ '#E98686', 'transparent' ],
                borderColor: ['transparent', 'transparent'],
                borderRadius: 30
            },
    
        ]
    }




    return (
        <Chart
            type="doughnut"
            data= { dataset } 
            options = { doughnutOptions }
        />
    )
};

export default DoughnutChart;