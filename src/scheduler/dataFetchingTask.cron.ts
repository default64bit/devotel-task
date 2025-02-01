import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { AppService } from 'src/app.service';
import config from './cron.config';

@Injectable()
export class DataFetchingTask {
    constructor(
        // ...
        private SchedulerRegistry: SchedulerRegistry,
        public AppService: AppService,
    ) {}

    @Cron(config.runtime, { name: 'DataFetching', timeZone: 'Asia/Tehran' })
    async job(): Promise<string | void> {
        console.log('running the cron job');
        await this.AppService.fetchJobOffer(config.url, config.provider);
    }
}
