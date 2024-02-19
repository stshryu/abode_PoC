import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Event } from './event.schema';
import { EventService } from './event.service';
import { EventDto } from './event.dto';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    async findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<Event | null> {
        return this.eventService.findById(id);
    }

    @Post()
    async create(@Body() eventDto: EventDto): Promise<Event> {
        return this.eventService.create(eventDto);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() eventDto: EventDto): Promise<Event | null> {
        return this.eventService.update(id, eventDto);
    }

    @Delete(':id')
    async delete(@Param('id') id): Promise<void> {
        return this.eventService.delete(id);
    }
}
