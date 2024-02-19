import { EventRepository } from './event.repository';
import { Event } from './event.schema';
export declare class EventNotify {
    private readonly eventRepository;
    private readonly logger;
    constructor(eventRepository: EventRepository);
    findNotifiableEvents(): Promise<Event[]>;
}
