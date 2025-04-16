import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printService: PrinterService
    ) {
        super();
    }

    hello() {
        const docDefinition = getHelloWorldReport({ name: 'BICHO' });
        const doc = this.printService.createPdf(docDefinition);
        return doc;
    }

    employmentLetter() {
        const docDefinition = getEmploymentLetterReport();
        const doc = this.printService.createPdf(docDefinition);
        return doc;
    }

    async employmentLetterById(employeeId: number) {

        const employee = await this.employees.findUnique({
            where: {
                id: employeeId
            }
        })

        if (!employee) throw new NotFoundException(`Employee with id ${employeeId} not found`)

        const docDefinition = getEmploymentLetterByIdReport({
            employerName: 'Tralalero Tralala',
            employerPosition: 'Gerente de RRHH',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'Tralalero Tralala Inc'
        });
        const doc = this.printService.createPdf(docDefinition);
        return doc;
    }

}
