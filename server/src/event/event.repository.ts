import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.schema';

@Injectable()
export class EventRepository {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

    async findAll(): Promise<Event[]> {
        try {
            return this.eventModel.find().exec();
        } catch (error) {
            throw new Error(`Failed to fetch events: ${error.message}`);
        }
    }

    async findById(id): Promise<Event | null> {
        try {
            return this.eventModel.findById(id).exec();
        } catch (error) {
            throw new Error(`Failed to find event ${id}: ${error.message}`);
        }
    }

    async findByDateRange(startDate: string, endDate: string, filterNotify=false): Promise<Event[]> {
        try {
            let query = this.eventModel.find({
                eventDate: { $gte: startDate, $lte: endDate },
            });

            if (filterNotify) {
                query = query.where('notified').equals(false);
            }

            return query.exec();
        } catch (error) {
            throw new Error("Failed to find events in the given date rate");
        }
    }

    async create(event: Event): Promise<Event> {
        try {
            const newEvent = new this.eventModel(event);
            return newEvent.save();
        } catch (error) {
            throw new Error(`Failed to create event: ${error.message}`);
        }
    }

    async update(id, event: Event): Promise<Event | null> {
        try {
            return this.eventModel.findByIdAndUpdate(id, event, { new: true }).exec();
        } catch (error) {
            throw new Error(`Failed to update event: ${error.message}`);
        }
    }

    async delete(id): Promise<void> {
        try {
            await this.eventModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new Error(`Failed to delete event ${id}: ${error.message}`);
        }
    }

    async deleteAll(): Promise<void> {
        try { 
            await this.eventModel.deleteMany().exec();
        } catch (error) {
            throw new Error(`Failed to delete all events: ${error.message}`);
        }
    }
}
