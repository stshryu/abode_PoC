import { Module } from '@nestjs/common';
import { EventNotifierService } from './eventnotifier.service';
import { EventModule } from './../event/event.module';
import { EmailModule } from './../util/email_service/email.module';
import { BullConfigModule } from './../util/bullqueue/bull.module';

@Module({
    imports: [EventModule, EmailModule, BullConfigModule],
    providers: [EventNotifierService],
})

export class TasksModule {}
