import { Controller, Get, Post, Put, Delete, Param, Body, Query, ValidationPipe } from '@nestjs/common';
import { Event } from './event.schema';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { FilterEventsDto } from './dto/filterEvent.dto';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    async findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }
    
    @Get('/:startDate/:endDate')
    async findByDateRange(@Param() filterEventsDto: FilterEventsDto): Promise<Event[]> {
        return this.eventService.findByDateRange(filterEventsDto.startDate, filterEventsDto.endDate);
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

    @Post('/testdata')
    async create_test_data(): Promise<Event[]> {
        const arr = [
            {
                _id: "65d43e9e82f20555c3027d19",
                attendees: [],
                description: "Create an event 10 days from now with no attendees",
                eventDate: new Date(Date.now() + (1000 * 864000)),
                name: "Event in 10 Days",
                notified: false,
                __v: 0
            },
            {
                _id: "65d43ea92ce4cbf7948924d6",
                attendees: ["email@email1.com", "email2@email2.com"],
                description: "Create an event in 1 day with 2 attendees",
                eventDate: new Date(Date.now() + (100 * 864000)),
                name: "Event in 1 Day",
                notified: false,
                __v: 0
            },
            {
                _id: "65d43eae6e0da5f5590677e4",
                attendees: ["test@test.com"],
                description: "Create an event that will occur within 30 minutes",
                eventDate: new Date(Date.now() + (1500 * 1000)),
                name: "Event in 25m",
                notified: false,
                __v: 0
            },
            {
                _id: "65d43ebc1da962aaa631cdcb",
                attendees: ["test@test.com"],
                description: "Create a event that will expire in the next 30 seconds",
                eventDate: new Date(Date.now() + 30000),
                name: "Event in 30s",
                notified: false,
                __v: 0
            }
        ]
        let responseArr = []
        arr.forEach((eventDto) => {
            responseArr.push(this.eventService.create(eventDto));
        });
        return responseArr;
    }

    @Post('/deleteallevents')
    async delete_all_data(): Promise<void> {
        return this.eventService.deleteAll();
    }
}
