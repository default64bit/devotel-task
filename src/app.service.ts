import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DataProcessor } from './dataProcessor/processor';
import { providers } from './dataProcessor/processor.interface';

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
        const dataProcessor = new DataProcessor(data, provider).getProcessor();
        const unifiedData = dataProcessor.process();

        // remove duplicate job offers from inserting
        const duplicateJobOffers = await this.PrismaService.jobOffers.findMany({ where: { job_code: { in: unifiedData.map((d) => d.job_code) } } });
        const duplicateCodesList = duplicateJobOffers.map((j) => j.job_code);
        const filteredData = unifiedData.filter((v, i) => duplicateCodesList.includes(v.job_code));

        // save data to the database
        await this.PrismaService.jobOffers.createMany({ data: filteredData });
    }
}
