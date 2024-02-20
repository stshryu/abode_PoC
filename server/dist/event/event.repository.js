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
exports.EventRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_schema_1 = require("./event.schema");
let EventRepository = class EventRepository {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async findAll() {
        try {
            return this.eventModel.find().exec();
        }
        catch (error) {
            throw new Error(`Failed to fetch events: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return this.eventModel.findById(id).exec();
        }
        catch (error) {
            throw new Error(`Failed to find event ${id}: ${error.message}`);
        }
    }
    async findByDateRange(startDate, endDate, filterNotify = false) {
        try {
            let query = this.eventModel.find({
                eventDate: { $gte: startDate, $lte: endDate },
            });
            if (filterNotify) {
                query = query.where('notified').equals(false);
            }
            return query.exec();
        }
        catch (error) {
            throw new Error("Failed to find events in the given date rate");
        }
    }
    async create(event) {
        try {
            const newEvent = new this.eventModel(event);
            return newEvent.save();
        }
        catch (error) {
            throw new Error(`Failed to create event: ${error.message}`);
        }
    }
    async update(id, event) {
        try {
            return this.eventModel.findByIdAndUpdate(id, event, { new: true }).exec();
        }
        catch (error) {
            throw new Error(`Failed to update event: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await this.eventModel.findByIdAndDelete(id).exec();
        }
        catch (error) {
            throw new Error(`Failed to delete event ${id}: ${error.message}`);
        }
    }
    async deleteAll() {
        try {
            await this.eventModel.deleteMany().exec();
        }
        catch (error) {
            throw new Error(`Failed to delete all events: ${error.message}`);
        }
    }
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventRepository);
//# sourceMappingURL=event.repository.js.map