import { Event } from './event.schema';
import { EventService } from './event.service';
import { EventDto } from './event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    findAll(): Promise<Event[]>;
    findById(id: any): Promise<Event | null>;
    create(eventDto: EventDto): Promise<Event>;
    update(id: any, eventDto: EventDto): Promise<Event | null>;
    delete(id: any): Promise<void>;
}
