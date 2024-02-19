import { Event } from './event.schema';
import { EventRepository } from './event.repository';
import { EventDto } from './event.dto';
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: EventRepository);
    findAll(): Promise<Event[]>;
    findById(id: number): Promise<Event | null>;
    create(eventDto: EventDto): Promise<Event>;
    update(id: number, eventDto: EventDto): Promise<Event | null>;
    delete(id: number): Promise<void>;
}
