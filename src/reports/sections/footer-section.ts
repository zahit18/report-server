import { Content } from "pdfmake/interfaces"

export const footerSection = (currentPage: number, pageCount: number): Content => {
    return {
        text: `Page ${currentPage} of ${pageCount}`,
        bold: true,
        alignment: "right",
        marginTop: 20,
        marginRight: 20
    }
}