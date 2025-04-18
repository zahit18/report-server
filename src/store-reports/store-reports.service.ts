import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { basicChartSVGReport, getHelloWorldReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printService: PrinterService
    ) {
        super();
    }

    async getOrderByIdReport(orderId: number) {

        const order = await this.orders.findUnique({
            where: {
                order_id: orderId,
            },
            include: {
                customers: true,
                order_details : {
                    include: {
                        products: true
                    }
                }
            }
        })

        if(!order) throw new NotFoundException(`Order with id ${orderId} not found`)

        const docDefinition = orderByIdReport({ data: order as any});
        const doc = this.printService.createPdf(docDefinition);
        return doc;
    }

    // SVG Report
        async getSVGReport() {
        const docDefinition = await basicChartSVGReport();
        const doc = this.printService.createPdf(docDefinition);
        return doc;
    }
}
