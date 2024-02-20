import { Event } from './event.schema';
export declare class TestingEventRepository {
    private eventArray;
    constructor();
    findAll(): Promise<Event[]>;
    findById(id: string): Promise<Event>;
    create(event: Event): Promise<Event>;
}
