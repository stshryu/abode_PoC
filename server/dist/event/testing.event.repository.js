"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingEventRepository = void 0;
const common_1 = require("@nestjs/common");
let TestingEventRepository = class TestingEventRepository {
    constructor() {
        const event1 = {
            _id: "1",
            name: "Event1",
            description: "Event 1 description",
            eventDate: new Date(),
            attendees: [],
            notified: false
        };
        const event2 = {
            _id: "2",
            name: "Event2",
            description: "Event 2 description",
            eventDate: new Date(Date.now() + (1000 * 86400)),
            attendees: ["test@test.com", "test2@test2.com"],
            notified: false
        };
        this.eventArray = [event1, event2];
    }
    async findAll() {
        try {
            return this.eventArray;
        }
        catch (error) {
            throw new Error(`Failed to fetch events: ${error.message}`);
        }
    }
    async findById(id) {
        let response;
        try {
            this.eventArray.forEach((event) => {
                if (event._id == id) {
                    response = event;
                }
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to find event ${id}: ${error.message}`);
        }
    }
    async create(event) {
        try {
            const newEvent = { ...event };
            this.eventArray.push(newEvent);
            return this.eventArray[this.eventArray.length - 1];
        }
        catch (error) {
            throw new Error(`Failed to create event: ${error.message}`);
        }
    }
};
exports.TestingEventRepository = TestingEventRepository;
exports.TestingEventRepository = TestingEventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TestingEventRepository);
//# sourceMappingURL=testing.event.repository.js.map