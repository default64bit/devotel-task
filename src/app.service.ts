import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DataProcessor } from './dataProcessor/processor';
import { providers } from './dataProcessor/processor.interface';
import { PaginationParams } from './interfaces/paginations.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
    constructor(
        // ...
        public PrismaService: PrismaService,
        public DataProcessor: DataProcessor,
    ) {}

    async fetchJobOffer(url: string, provider: providers): Promise<void> {
        // fetch the data from provider
        const R = await fetch(url);
        if (!R.ok || R.status >= 400) throw new Error(`Api Error: ${R.status} - ${R.statusText}`);

        // unify the fetched data
        const data: any = await R.json().catch((e) => {
            console.log(e);
            return {};
        });

        const dataProcessor = new DataProcessor().getProcessor(data, provider);
        const unifiedData = dataProcessor.process();

        // remove duplicate job offers from inserting
        const duplicateJobOffers = await this.PrismaService.jobOffers.findMany({ where: { job_code: { in: unifiedData.map((d) => d.job_code) } } });
        const duplicateCodesList = duplicateJobOffers.map((j) => j.job_code);
        const filteredData = unifiedData.filter((v, i) => !duplicateCodesList.includes(v.job_code));

        console.log({ filteredData });

        // save data to the database
        await this.PrismaService.jobOffers.createMany({ data: filteredData });
    }

    async GetJobOffersWithPagination(params: PaginationParams) {
        // Construct the pagination parameters
        const skip = (params.page - 1) * params.perPage;
        const take = params.perPage;

        // Build the filters dynamically
        const where: Prisma.JobOffersWhereInput = params.search
            ? {
                  OR: [
                      { job_code: { contains: params.search } },
                      { title: { contains: params.search } },
                      { location: { contains: params.search } },
                      { salary_min: { contains: params.search } },
                      { salary_max: { contains: params.search } },
                      { company: { contains: params.search } },
                      { industry: { contains: params.search } },
                      { skills: { contains: params.search } },
                  ],
              }
            : {};

        // Handle sorting dynamically
        const orderBy: Prisma.JobOffersOrderByWithRelationInput = {
            [params.sortBy || 'created_at']: params.sortType,
        };

        // Fetch the jobs with pagination
        const jobs = await this.PrismaService.jobOffers.findMany({ where, skip, take, orderBy });
        // Count the total number of jobs (to calculate total pages)
        const totalCount = await this.PrismaService.jobOffers.count({ where });

        return {
            records: jobs,
            totalCount,
            totalPages: Math.ceil(totalCount / params.perPage),
            currentPage: params.page,
        };
    }
}
