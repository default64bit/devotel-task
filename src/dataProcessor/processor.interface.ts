export interface DataProcessorInterface {
    readonly data: any;
    process(): DataStructure[];
}

export interface DataStructure {
    job_code: string;
    title: string;
    location: string;
    job_type: 'fulltime' | 'parttime' | 'remote' | 'contract';
    salary_min: string;
    salary_max: string;
    salary_unit: string;
    company: string;
    industry?: string;
    website?: string;
    skills: string;
    experience: number;
    posted_at: Date;
}

export type providers = 'provider1' | 'provider2';
