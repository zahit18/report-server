import { TDocumentDefinitions } from "pdfmake/interfaces"
import { generateDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header-section";

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

    const donutChart = await generateDonutChart({
        entries: options.topCountries.map((c) => ({
            label: c.country,
            value: +c.customers,
        })),
        position: "left"
    })

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadisticas de clientes',
            subtitle: options.subTitle ?? 'Top 10 paises con mas clientes'
        }),
        content: [
            {
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
            },
        ]
    }

    return docDefinition

}
