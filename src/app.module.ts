import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { Modules } from './modules';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig.get), Modules],
})
export class AppModule {}
