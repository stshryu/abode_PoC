import { Job } from 'bull';
import { Event } from './../../event/event.schema';
import { EventService } from './../../event/event.service';
export declare class WorkerService {
    private readonly eventService;
    private readonly logger;
    constructor(eventService: EventService);
    deactivateNotify(job: Job<Event>): Promise<void>;
    onQueueActive(): void;
}
