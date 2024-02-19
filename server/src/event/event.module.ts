import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';
import { EventController } from './event.controller';

@Module({
    imports : [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
    controllers: [EventController],
    providers: [EventService, EventRepository]
})

export class EventModule {}
