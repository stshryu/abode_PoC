import { Injectable } from '@nestjs/common';
import { Event } from './event.schema';
import { EventRepository } from './event.repository';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) {}

    async findAll(): Promise<Event[]> {
        try {
            return await this.eventRepository.findAll();
        } catch (error) {
            throw new Error(`Failed to fetch events: ${error.message}`);
        }
    }

    async findByDateRange(startDate: string, endDate: string) {
        try {
            return this.eventRepository.findByDateRange(startDate, endDate);
        } catch (error) {
            throw new Error(`Failed to fetch event in date range`);
        }
    }

    async findById(id: string): Promise<Event | null> {
        try {
            return this.eventRepository.findById(id);
        } catch (error) {
            throw new Error(`Failed to fetch event ${id}: ${error.message}`);
        }
    }

    async create(eventDto: EventDto): Promise<Event> {
        try {
            return this.eventRepository.create(eventDto);
        } catch (error) {
            throw new Error(`Failed to create event: ${error.message}`);
        }
    }

    async update(id: string, eventDto: EventDto): Promise<Event | null> {
        try {
            return this.eventRepository.update(id, eventDto);
        } catch (error) {
            throw new Error(`Failed to update event ${id}: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            return this.eventRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete event ${id}: ${error.message}`);
        }
    }

    async deleteAll(): Promise<void> {
        try {
            return this.eventRepository.deleteAll();
        } catch (error) {
            throw new Error(`Failed to delete all events`);
        }
    }
}
