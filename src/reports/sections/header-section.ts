import { Content } from "pdfmake/interfaces";
import { DateFormater } from "src/helpers/";

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: string;
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subtitle, showDate = true, showLogo = true } = options;

    const headerLogo: Content = showLogo ? {
        image: 'src/assets/tucan-code-logo.png',
        width: 80,
        height: 80,
        alignment: 'center',
        margin: [0, 0, 0, 0]
    } : { text: '' };

    const headerDate: Content = showDate ? {
        text: DateFormater.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [10, 10, 20, 0] // [left, top, right, bottom]
    } : { text: '' };

    const headerSubtitle: Content = subtitle ? {
        text: subtitle,
        margin: [0, 5, 0, 0],
        fontSize: 14
    } : { text: '' };

    const headerTitleStack: Content = title ? {
        stack: [
            {
                text: title,
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 0]
            },
            headerSubtitle
        ],
        alignment: 'center',
        margin: [0, 10, 0, 0]
    } : { text: '' };

    return {
        columns: [
            { width: '20%', stack: [headerLogo] },
            { width: '*', stack: [headerTitleStack], alignment: 'center' },
            { width: '20%', stack: [headerDate], alignment: 'right' }
        ],
        columnGap: 10,
        margin: [0, 10, 0, 10]
    };
};
