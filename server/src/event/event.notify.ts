import { Injectable, Logger } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { Event } from './event.schema';

@Injectable()
export class EventNotify{
    private readonly logger = new Logger(EventNotify.name);
    constructor(private readonly eventRepository: EventRepository) {} 

    async findNotifiableEvents(): Promise<Event[]> {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 30 * 60000); // 30M window

        this.logger.log(`Finding notifiable events within 30 minutes of ${startDate}`);
        return this.eventRepository.findByDateRange(startDate.toISOString(), endDate.toISOString(), true);
    } 
}
