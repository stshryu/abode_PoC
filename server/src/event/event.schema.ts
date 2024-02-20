import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>; 

@Schema({ timestamps: true })
export class Event {
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    eventDate: Date;

    @Prop([String])
    attendees: string[];

    @Prop({ type: Boolean, default: false, select: false })
    notified: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event); 
