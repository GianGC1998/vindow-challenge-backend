import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apikeys } from '../common/entities/api-key.entity';
import { ApiKeyMiddleware } from '../common/middlewares/apiKey.middleware';
import { HealhtcheckModule } from './healthcheck/healthcheck.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [HealhtcheckModule, NewsModule, TypeOrmModule.forFeature([Apikeys])],
})
export class Modules implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
