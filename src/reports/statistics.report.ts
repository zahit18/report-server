import { TDocumentDefinitions } from "pdfmake/interfaces"
import * as Utils from 'src/helpers/chart-utils'

interface TopCountry {
    country: string | null;
    customers: string;
}

interface ReportOptions {
    title?: string;
    subTitle?: string;
    topCountries: TopCountry[];
}

const generateTopCountryDonut = async (topCountries: TopCountry[]): Promise<string> => {

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: topCountries.map((country) => country.country),
        datasets: [
            {
                label: 'Dataset 1',
                data: topCountries.map((country) => country.customers),
                //backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position: 'top',
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 14
                    }
                    //text: 'Chart.js Doughnut Chart'
                }
            }
        },
    };

    return Utils.chartJsToImage(config)
}

export const statisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {

    const donut = await generateTopCountryDonut(options.topCountries)

    const docDefinition: TDocumentDefinitions = {
        content:
            [
                {
                    image: donut,
                    width: 500
                }
            ]
    }

    return docDefinition

}
