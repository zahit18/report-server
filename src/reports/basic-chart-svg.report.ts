import fs from 'fs'
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from '../helpers/chart-utils'

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8')

const generateChartImage = async () => {
    const chartConfig = {
        type: 'bar',                                // Show a bar chart
        data: {
            labels: [2012, 2013, 2014, 2015, 2016],   // Set X-axis labels
            datasets: [{
                label: 'Users',                         // Create the 'Users' dataset
                data: [120, 60, 50, 180, 120]           // Add data to the chart
            }]
        }
    }

    return Utils.chartJsToImage(chartConfig);
}

const generateDonutChart = async () => {
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Chart js Donut Chart'
            }
        }
    };

        return Utils.chartJsToImage(config);
}

export const basicChartSVGReport = async (): Promise<TDocumentDefinitions> => {

    const [chart, donut] = await Promise.all([generateChartImage(), generateDonutChart()])
    // const chart = await generateChartImage();
    // const donut = await generateDonutChart();

    return {
        content:
            [
                {
                    svg: svgContent,
                    width: 100,
                    fit: [100, 100]
                },
                {
                    image: chart,
                    width: 500
                },
                {
                    image: donut,
                    width: 500
                }
            ]
    }

}