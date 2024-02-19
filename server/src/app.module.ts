import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { LoggerMiddleware } from './util/middlewares/logger.middleware';

@Module({
  imports: [
      EventModule,
      MongooseModule.forRoot('mongodb://mongodb:27017/events'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
