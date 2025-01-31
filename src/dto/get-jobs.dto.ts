import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';

export class GetJobsDto {
    @IsOptional()
    @IsString()
    search?: string = '';

    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    perPage: number = 25;

    @IsOptional()
    @IsIn(['job_code', 'salary_min', 'salary_max', 'experience', 'created_at'])
    sortBy: string;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortType: 'asc' | 'desc' = 'desc';
}
