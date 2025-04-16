import { Content } from "pdfmake/interfaces";
import { DateFormater } from "src/helpers/date-formatter";

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: string;
}

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}

export const headerSection = (options: HeaderOptions): Content => {

    const { title, subtitle, showDate = true, showLogo = true } = options
    const headerLogo: Content = showLogo ? logo : '';
    const headerDate: Content = showDate
        ? {
            text: DateFormater.getDDMMMMYYYY(new Date()),
            alignment: 'right',
            margin: [20, 20]
        }
        : ''
    
    const headerTitle: Content = title
    ? {
        text: title,
        style: {
            bold: true,
            alignment: 'center'
        }
    }
    : ''

    return {
        columns: [
            headerLogo,
            headerDate
        ]
    }

}