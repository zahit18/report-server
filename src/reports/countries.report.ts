import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection, footerSection } from "./sections/";
import { countries as Country} from "@prisma/client";

interface Reportoptions {
    title?: string;
    subTitle?: string;
    countries: Country[];
}

export const getCountriesReport = (options: Reportoptions): TDocumentDefinitions => {

    const {title, subTitle, countries} = options

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Countries Report',
            subtitle: subTitle ?? 'List of Countries',
        }),
        footer: footerSection,
        //footer: function(currentPage, pageCount) { return footerSection(currentPage, pageCount) },
        pageMargins: [40, 110, 40, 60],
        content: [
            {
                layout: 'customLayout01',
                table: {
                    headerRows: 1,
                    widths: [50, 50, 50, '*', 'auto', '*'],
                    body: [
                        ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                        ...countries.map((country) => [
                            country.id.toString(),
                            country.iso2,
                            country.iso3 ?? '',
                            {text: country.name, bold: true},
                            country.continent ?? '',
                            country.local_name ?? ''
                        ]),
                        ['', '', '', '', '', ''],
                        [
                            '',
                            '',
                            '',
                            '',
                            'Total',
                            {
                                text: `${countries.length} paise`,
                                bold: true
                            }
                        ]
                    ]
                }
            },
            // Tabla de totales
            {
                text: 'Totales',
                style: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 40, 0, 0]
                }
            },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 1,
                    widths: [50, 50, 70, '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Total de paises',
                                colSpan: 3,
                                bold: true
                            },
                            {},
                            {},
                            {
                                text: `${countries.length} paises`,
                                bold: true
                            },
                            {},
                            {}
                        ]
                    ]
                }
            }
        ]
    }
}