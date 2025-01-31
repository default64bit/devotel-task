import { Injectable } from '@nestjs/common';
import { Provider1Processor } from './providers/provider1';
import { Provider2Processor } from './providers/provider2';
import { DataProcessorInterface, providers } from './processor.interface';

@Injectable()
export class DataProcessor {
    data: any;
    providerName: providers;

    constructor(data: any, providerName: providers) {
        this.data = data;
        this.providerName = providerName;
    }

    public getProcessor(): DataProcessorInterface | null {
        switch (this.providerName) {
            case 'provider1':
                return new Provider1Processor(this.data);
            case 'provider2':
                return new Provider2Processor(this.data);
            default:
                return null;
        }
    }
}
