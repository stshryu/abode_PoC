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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const event_dto_1 = require("./dto/event.dto");
const filterEvent_dto_1 = require("./dto/filterEvent.dto");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async findAll() {
        return this.eventService.findAll();
    }
    async findByDateRange(filterEventsDto) {
        return this.eventService.findByDateRange(filterEventsDto.startDate, filterEventsDto.endDate);
    }
    async findById(id) {
        return this.eventService.findById(id);
    }
    async create(eventDto) {
        return this.eventService.create(eventDto);
    }
    async update(id, eventDto) {
        return this.eventService.update(id, eventDto);
    }
    async delete(id) {
        return this.eventService.delete(id);
    }
    async create_test_data() {
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
        ];
        let responseArr = [];
        arr.forEach((eventDto) => {
            responseArr.push(this.eventService.create(eventDto));
        });
        return responseArr;
    }
    async delete_all_data() {
        return this.eventService.deleteAll();
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:startDate/:endDate'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filterEvent_dto_1.FilterEventsDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.EventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, event_dto_1.EventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/testdata'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create_test_data", null);
__decorate([
    (0, common_1.Post)('/deleteallevents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "delete_all_data", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map