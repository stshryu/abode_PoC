import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>; 

@Schema({ timestamps: true })
export class Event {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    eventDate: Date;

    @Prop([String])
    attendees: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event); 
