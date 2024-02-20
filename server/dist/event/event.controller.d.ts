import { Event } from './event.schema';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { FilterEventsDto } from './dto/filterEvent.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    findAll(): Promise<Event[]>;
    findByDateRange(filterEventsDto: FilterEventsDto): Promise<Event[]>;
    findById(id: any): Promise<Event | null>;
    create(eventDto: EventDto): Promise<Event>;
    update(id: any, eventDto: EventDto): Promise<Event | null>;
    delete(id: any): Promise<void>;
    create_test_data(): Promise<Event[]>;
    delete_all_data(): Promise<void>;
}
