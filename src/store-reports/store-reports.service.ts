import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService {

    constructor(
        private readonly printService: PrinterService
    ) { }

    hello() {
        const docDefinition = orderByIdReport();
        const doc = this.printService.createPdf(docDefinition);
        return doc;
    }
}
