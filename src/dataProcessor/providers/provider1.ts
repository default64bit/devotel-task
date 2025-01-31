import { Request } from 'express';
import { DataProcessorInterface, DataStructure } from '../processor.interface';

export class Provider1Processor implements DataProcessorInterface {
    public data: any;

    constructor(data: any) {
        this.data = data;
    }

    public process(): DataStructure[] {
        return this.data['jobs'].map((job) => {
            const salaryRange = job.details.salaryRange.split(' - ');
            return {
                job_code: job.jobId,
                title: job.title,
                location: job.details.location,
                job_type: job.details.type.replace('-', '').toLocaleLowerCase(),
                salary_min: salaryRange[0].substring(1),
                salary_max: salaryRange[1].substring(1),
                salary_unit: salaryRange[0].substring(0, 1),
                company: job.company.name,
                industry: job.company.industry,
                website: '',
                skills: job.skills.join(','),
                posted_at: new Date(job.postedDate),
            };
        });
    }
}
