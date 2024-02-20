import { Injectable } from '@nestjs/common';
import { Event, EventDocument } from './event.schema';

@Injectable()
export class TestingEventRepository {
    private eventArray: Event[];

    constructor() {
        const event1: Event = {
            _id: "1",
            name: "Event1",
            description: "Event 1 description",
            eventDate: new Date(),
            attendees: [],
            notified: false
        }
        const event2: Event = {
            _id: "2",
            name: "Event2",
            description: "Event 2 description",
            eventDate: new Date(Date.now() + (1000 * 86400)),
            attendees: ["test@test.com", "test2@test2.com"],
            notified: false
        }
        this.eventArray = [event1, event2];
    }

    async findAll(): Promise<Event[]> {
        try {
            return this.eventArray;
        } catch (error) {
            throw new Error(`Failed to fetch events: ${error.message}`);
        }
    }

    async findById(id: string): Promise<Event> {
        let response; 
        try {
            this.eventArray.forEach((event) => {
                if (event._id == id) {
                   response = event;
                }
            });
            return response;
        } catch (error) {
            throw new Error(`Failed to find event ${id}: ${error.message}`);
        }
    }

    async create(event: Event): Promise<Event> {
        try {
            const newEvent: Event = {...event};
            this.eventArray.push(newEvent);
            return this.eventArray[this.eventArray.length - 1];
        } catch (error) {
            throw new Error(`Failed to create event: ${error.message}`);
        }
    }
}
