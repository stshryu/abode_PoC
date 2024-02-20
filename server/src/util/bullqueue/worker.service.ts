import { Injectable, Logger } from '@nestjs/common';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Event } from './../../event/event.schema';
import { EventService } from './../../event/event.service';

@Injectable()
@Processor('events')
export class WorkerService {
    private readonly logger = new Logger(WorkerService.name);

    constructor(private readonly eventService: EventService) {}

    @Process('deactivateNotify')
    async deactivateNotify(job: Job<Event>) {
        const event: Event = job.data;
        event.notified = true;
        this.eventService.update(event._id, event);
    }

    @OnQueueActive()
    onQueueActive() {
       this.logger.log('Queue is active');
    }
}
