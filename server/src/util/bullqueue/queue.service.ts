import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Event } from './../../event/event.schema';

@Injectable()
export class QueueService { 
    private readonly logger = new Logger(QueueService.name);
    constructor(@InjectQueue('events') private eventsQueue: Queue) {}

    async addEventToQueue(event: Event) {
        this.logger.log(`Queuing job to disable notifications for event: ${event}`);
        await this.eventsQueue.add('deactivateNotify', event);
    }
}
