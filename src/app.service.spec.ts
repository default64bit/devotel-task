import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { DataProcessor } from './dataProcessor/processor';

describe('DataService', () => {
    let appService: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService, PrismaService, DataProcessor],
        }).compile();

        appService = module.get<AppService>(AppService);
    });

    it('should fetch data from API, format it, and save it to the database', async () => {
        // call the function we are testing and check if throws any error
        await expect(appService.fetchJobOffer('https://assignment.devotel.io/api/provider1/jobs', 'provider1')).resolves.not.toThrow();
        await expect(appService.fetchJobOffer('https://assignment.devotel.io/api/provider2/jobs', 'provider2')).resolves.not.toThrow();
    });
});
