import { TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header-section";
import { generateDonutChart, getLineChart, getBarsChart } from "./charts/";

interface TopCountry {
    country: string | null;
    customers: string;
}

interface ReportOptions {
    title?: string;
    subTitle?: string;
    topCountries: TopCountry[];
}

export const statisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {

    // Optimizar dos awaits
    const [donutChart, lineChart, barsChart, barsChart2] = await Promise.all([
        generateDonutChart({
            entries: options.topCountries.map((c) => ({
                label: c.country,
                value: +c.customers,
            })),
            position: "left"
        }), 
        getLineChart(),
        getBarsChart(),
        getBarsChart()

    ])

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadisticas de clientes',
            subtitle: options.subTitle ?? 'Top 10 paises con mas clientes'
        }),
        content: [
            {
                //#region ----- Donut Chart -----
                columns: [
                    {
                        stack: [
                            {
                                text: '10 paises con mas clientes',
                                alignment: 'center',
                                marginBottom: 10
                            },
                            {
                                image: donutChart,
                                width: 320
                            }
                        ]
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['Pais', 'Clientes'],
                                ...options.topCountries.map((c) => [c.country ?? '', c.customers])
                            ]
                        }
                    }
                ]
                //#endregion ----- Donut Chart -----
            },
            {
                //#region  ----- Line Chart -----
                image: lineChart ?? '',
                width: 500,
                marginTop: 20
                //#endregion
            },
            {
                columnGap: 10,
                marginTop: 20,
                columns: [
                    {
                        image: barsChart,
                        width: 250
                    },
                    {
                        image: barsChart2,
                        width: 250
                    }
                ]
            }
        ]
    }

    return docDefinition

}
