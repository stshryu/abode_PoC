import { Event } from './event.schema';
import { EventRepository } from './event.repository';
import { EventDto } from './dto/event.dto';
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: EventRepository);
    findAll(): Promise<Event[]>;
    findByDateRange(startDate: string, endDate: string): Promise<Event[]>;
    findById(id: string): Promise<Event | null>;
    create(eventDto: EventDto): Promise<Event>;
    update(id: string, eventDto: EventDto): Promise<Event | null>;
    delete(id: string): Promise<void>;
}
