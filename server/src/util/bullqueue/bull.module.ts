import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';
import { WorkerService } from './worker.service';
import { EventModule } from './../../event/event.module';

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule, EventModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                },
            }),
        }),
        BullModule.registerQueue({
            name: 'events'
        }),
        EventModule,
    ],
    providers: [QueueService, WorkerService],
    exports: [QueueService]
})

export class BullConfigModule {}
