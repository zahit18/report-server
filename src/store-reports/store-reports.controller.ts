import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express'

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) { }

  @Get('orders/:orderId')
  async getStoreReport(@Param('orderId') orderId: string, @Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  // SVG
    @Get('svg-report')
  async getSVGReport(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSVGReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  // Statistics
  @Get('statistics')
  async statistics(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getStatisticsReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Statistics-Report'
    pdfDoc.pipe(response)
    pdfDoc.end()

  }

}
