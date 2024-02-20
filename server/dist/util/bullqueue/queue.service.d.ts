import { Queue } from 'bull';
import { Event } from './../../event/event.schema';
export declare class QueueService {
    private eventsQueue;
    private readonly logger;
    constructor(eventsQueue: Queue);
    addEventToQueue(event: Event): Promise<void>;
}
