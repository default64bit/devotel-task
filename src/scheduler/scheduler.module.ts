import { Module } from '@nestjs/common';
import { DataFetchingTask } from './dataFetchingTask.cron';
import { AppService } from 'src/app.service';
import { PrismaService } from 'prisma/prisma.service';
import { DataProcessor } from 'src/dataProcessor/processor';

@Module({
    providers: [
        // ...
        AppService,
        PrismaService,
        DataProcessor,
        // Tasks ...
        DataFetchingTask,
    ],
    controllers: [],
    imports: [],
})
export class SchedulerModule {}
