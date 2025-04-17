import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormater, DateFormater } from "src/helpers/";
import { footerSection } from "./sections";

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 20]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 18,
        bold: true,
        marginTop: 30
    },
    subHeader: {
        fontSize: 16,
        bold: true,
        marginTop: 20
    }
}

export const orderByIdReport = (): TDocumentDefinitions => {

    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
        footer: footerSection,
        content: [
            // Headers
            {
                text: 'Tucan Code',
                style: 'header'
            },
            // Direccion y numero de recibo
            {
                columns: [
                    {
                        text: `15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com`,
                    },
                    {
                        text:
                            [
                                { text: 'Recibo No. 2345\n', bold: true, fontSize: 16 },
                                `Fecha del recibo: ${DateFormater.getDDMMMMYYYY(new Date())}\nPagar antes de: ${DateFormater.getDDMMMMYYYY(new Date())}`
                            ],
                        alignment: 'right',
                    }
                ]
            },
            // QR
            {
                qr: 'https://devtalles.com', fit: 75, alignment: 'right'
            },
            // Direccion del cliente
            {
                text:
                    [
                        { text: `Cobrar a: \n`, style: 'subHeader' },
                        `Razon Social: Richter Supermarkt Michael Holz
                        Grenzacherweg 237`
                    ]
            },
            // Table del detalle de la order
            {
                layout: 'headerLineOnly',
                marginTop: 20,
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],

                        ['1', 'Producto 1', '1', '100', CurrencyFormater.formatCurrency(100)],
                        ['1', 'Producto 1', '1', '100', CurrencyFormater.formatCurrency(100)],
                        ['1', 'Producto 1', '1', '100', CurrencyFormater.formatCurrency(100)],
                        ['1', 'Producto 1', '1', '100', CurrencyFormater.formatCurrency(100)],
                        ['1', 'Producto 1', '1', '100', CurrencyFormater.formatCurrency(100)],
                        ['1', 'Producto 1', '1', '100', { text: CurrencyFormater.formatCurrency(1500), alignment: 'right' }],
                    ]
                }
            },
            // Salto de lineas
            '\n\n',
            // Totales
            {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                [
                                    'Subtotal',
                                    {
                                        text: CurrencyFormater.formatCurrency(120),
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    { text: 'Total', bold: true },
                                    {
                                        text: CurrencyFormater.formatCurrency(150),
                                        alignment: 'right',
                                        bold: true
                                    },
                                ]
                            ]
                        }
                    }
                ]
            }
        ],
    }
}

