import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { EventModule } from './event.module';
import { EventRepository } from './event.repository';
import { TestingEventRepository } from './testing.event.repository';

describe('EventService', () => {
    let service: EventService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: EventService, useClass: EventService },
                { provide: EventRepository, useClass: TestingEventRepository }
            ],
        }).compile();

        service = module.get<EventService>(EventService);
    });

    describe('create', () => {
        it('should create an event', async () => {
            // Arrange
            const payload = {
                _id: "3",
                name: "Testing1",
                description: "Testing description 1",
                eventDate: new Date(),
                attendees: ["test@test.com"],
                notified: false
            }

            // Act
            const event = await service.create(payload);

            // Assert
            expect(event.name).toEqual("Testing1");
        });
    });

    describe('findAll', () => {
        it('should find all events', async () => {
            // Arrange

            // Act
            const event = await service.findAll();

            // Assert
            expect(event.length).toEqual(2);
        });
    });

    describe('findById', () => {
        it('should find a specific event', async () => {
            // Arrange
            const newId = "1";

            // Act
            const event = await service.findById(newId);

            // Assert
            expect(event._id).toEqual("1");
        });
    });
});
