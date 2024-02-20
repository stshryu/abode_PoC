import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { LoggerMiddleware } from './util/middlewares/logger.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { BullConfigModule } from './util/bullqueue/bull.module';

@Module({
  imports: [
      EventModule,
      MongooseModule.forRoot('mongodb://mongodb:27017/events'),
      ScheduleModule.forRoot(),
      TasksModule,
      BullConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
