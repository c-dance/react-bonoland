import { Charts } from "./MapChartStyle";
import { Chart as chartJs, ArcElement, Legend, Title, DoughnutController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import helpers from 'chart.js/helpers';

chartJs.register(ArcElement, Legend, Title, DoughnutController );


const oldData = {
    labels: [ '고령', '남자', '여자' ],
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

const options = {
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
            text: 'here are title',
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


const MapChart = ( { data } ) => {


    if(data) {        
        return (
            <Charts>
                <Chart
                    type="doughnut"
                    data= { oldData } 
                    options = { options }
                />
            </Charts>
        )
    }
}

export default MapChart;