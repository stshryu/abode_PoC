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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("./event.repository");
let EventService = class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async findAll() {
        try {
            return await this.eventRepository.findAll();
        }
        catch (error) {
            throw new Error("Failed to fetch events: ${error.message}");
        }
    }
    async findById(id) {
        try {
            return this.eventRepository.findById(id);
        }
        catch (error) {
            throw new Error("Failed to fetch event ${id}: ${error.message}");
        }
    }
    async create(eventDto) {
        try {
            return this.eventRepository.create(eventDto);
        }
        catch (error) {
            throw new Error("Failed to create event: ${error.message}");
        }
    }
    async update(id, eventDto) {
        try {
            return this.eventRepository.update(id, eventDto);
        }
        catch (error) {
            throw new Error("Failed to update event ${id}: ${error.message}");
        }
    }
    async delete(id) {
        try {
            return this.eventRepository.delete(id);
        }
        catch (error) {
            throw new Error("Failed to delete event ${id}: ${error.message}");
        }
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_repository_1.EventRepository])
], EventService);
//# sourceMappingURL=event.service.js.map