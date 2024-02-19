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
var EventNotify_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventNotify = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("./event.repository");
let EventNotify = EventNotify_1 = class EventNotify {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
        this.logger = new common_1.Logger(EventNotify_1.name);
    }
    async findNotifiableEvents() {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 30 * 60000);
        this.logger.log(`Finding notifiable events within 30 minutes of ${startDate}`);
        return this.eventRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());
    }
};
exports.EventNotify = EventNotify;
exports.EventNotify = EventNotify = EventNotify_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_repository_1.EventRepository])
], EventNotify);
//# sourceMappingURL=event.notify.js.map