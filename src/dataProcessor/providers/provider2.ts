import { Request } from 'express';
import { DataProcessorInterface, DataStructure } from '../processor.interface';
import currencies from 'src/currencies';

export class Provider2Processor implements DataProcessorInterface {
    public data: any;

    constructor(data: any) {
        this.data = data;
    }

    public process(): DataStructure[] {
        const processedData: DataStructure[] = [];
        const jobList = this.data['data']['jobsList'];

        for (const jobId in jobList) {
            jobList[jobId];
            processedData.push({
                job_code: jobId,
                title: jobList[jobId].position,
                location: `${jobList[jobId].location.city}, ${jobList[jobId].location.state}`,
                job_type: jobList[jobId].location.remote ? 'remote' : 'fulltime',
                salary_min: jobList[jobId].compensation.min,
                salary_max: jobList[jobId].compensation.max,
                salary_unit: currencies[jobList[jobId].compensation.currency].symbol,
                company: jobList[jobId].employer.companyName,
                industry: '',
                website: jobList[jobId].employer.website,
                experience: jobList[jobId].requirements.experience,
                skills: jobList[jobId].requirements.technologies.join(','),
                posted_at: new Date(jobList[jobId].datePosted),
            });
        }

        return processedData;
    }
}
