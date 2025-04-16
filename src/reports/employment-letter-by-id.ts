import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header-section";
import { DateFormater } from "src/helpers/date-formatter";

interface ReportValues {
    employerName: string;
    employerPosition: string;
    employeeName: string;
    employeePosition: string;
    employeeStartDate: Date;
    employeeHours: number;
    employeeWorkSchedule: string;
    employerCompany: string;
}

const style: StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 60, 0, 20]
    },
    body: {
        margin: [0, 0, 0, 70],
        alignment: 'justify'
    },
    signature: {
        fontSize: 14,
        bold: true,
        alignment: 'left',
    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
    }
}

export const getEmploymentLetterByIdReport = (values: ReportValues): TDocumentDefinitions => {

    const {
        employerName,
        employerPosition,
        employeeName,
        employeePosition,
        employeeStartDate,
        employeeHours,
        employeeWorkSchedule,
        employerCompany
    } = values

    const docDefinition: TDocumentDefinitions = {
        styles: style,
        pageMargins: [40, 60, 40, 60],
        header: headerSection({}),
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header'
            },
            {
                text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormater.getDDMMMMYYYY(employeeStartDate)}.\n\n
                Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n\n
                La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa. \n\n
                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente. \n\n`,
                style: 'body'
            },
            {
                text: `Atentamente, \n\n${employerName} \n\n${employerPosition} \n\n${employerCompany} \n\n${DateFormater.getDDMMMMYYYY(new Date())}`,
                style: 'signature'
            },
        ],
        footer: {
            text: `Esta documento es una constancia de empleo y no representa un compromiso laboral.`,
            style: 'footer'
        }
    }

    return docDefinition
}