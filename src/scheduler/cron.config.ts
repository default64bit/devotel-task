import { CronExpression } from '@nestjs/schedule';

export type CronConfig = {
    runtime: CronExpression;
    url: string;
    provider: 'provider1' | 'provider2';
};

const config: CronConfig = {
    runtime: CronExpression.EVERY_HOUR,
    url: 'https://assignment.devotel.io/api/provider2/jobs',
    provider: 'provider2',
};

export default config;
