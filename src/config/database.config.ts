import { DataSourceOptions } from 'typeorm';
import { EnvConfig } from './env.config';
import { News } from '../common/entities';
import { Apikeys } from '../common/entities/api-key.entity';

export class DatabaseConfig {
  static get get(): DataSourceOptions {
    const config = EnvConfig.dbConfig();
    return {
      ...config,
      type: 'mongodb',
      authSource: 'admin',
      entities: [News, Apikeys],
      synchronize: true, // For dev purposes
    };
  }
}
