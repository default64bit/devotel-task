import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { GetJobsDto } from './dto/get-jobs.dto';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/job-offers')
    async GetJobOffersWithPagination(@Query() query: GetJobsDto, @Req() req: Request, @Res() res: Response) {
        const { records, totalCount, totalPages, currentPage } = await this.appService.GetJobOffersWithPagination({
            search: query.search,
            page: query.page || 1,
            perPage: query.perPage || 25,
            sortBy: query.sortBy,
            sortType: query.sortType,
        });

        return res.json({ records, totalCount, totalPages, currentPage });
    }
}
