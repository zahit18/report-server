import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';


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

        const docDefinition = getHelloWorldReport({name: 'BICHO'});

        const doc = this.printService.createPdf(docDefinition);

        return doc;
    }
}
