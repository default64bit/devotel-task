import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { DataProcessor } from './dataProcessor/processor';

@Module({
    imports: [
        // ...
        PrismaModule,
        ScheduleModule.forRoot(),
        SchedulerModule,
    ],
    controllers: [AppController],
    providers: [AppService, DataProcessor],
})
export class AppModule {}
