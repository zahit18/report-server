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

export interface CompleteOrder {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
}

export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
}


interface ReportValues {
    title?: string;
    subTitle?: string;
    data: CompleteOrder
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {

    const { data } = values

    const { customers, order_details } = data

    const subTotal = order_details.reduce((acc, detail) => acc + detail.quantity * +detail.products.price, 0)

    const total = subTotal * 1.15
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
                                { text: `Recibo No. ${data.order_id}\n`, bold: true, fontSize: 16 },
                                `Fecha del recibo: ${DateFormater.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormater.getDDMMMMYYYY(new Date())}`
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
                        `Razon Social: ${customers.contact_name}
                        Contacto: ${customers.contact_name}`
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

                        ...order_details.map((detail) => [
                            detail.order_detail_id.toString(),
                            detail.products.product_name,
                            {
                                text: detail.quantity.toString(),
                                alignment: 'center'
                            },
                            {
                                text: CurrencyFormater.formatCurrency(+detail.products.price),
                                alignment: 'right'
                            },
                            {
                                text: CurrencyFormater.formatCurrency(+detail.products.price * detail.quantity),
                                alignment: 'right'
                            }
                        ])
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
                                        text: CurrencyFormater.formatCurrency(subTotal),
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    { text: 'Total', bold: true },
                                    {
                                        text: CurrencyFormater.formatCurrency(total),
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

