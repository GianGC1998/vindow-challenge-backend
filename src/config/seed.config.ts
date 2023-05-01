/* tslint:disable:no-console */
import { DataSource, MongoRepository } from 'typeorm';

import { News } from '../common/entities';
import { DatabaseConfig } from './database.config';
import { value } from './seeds/data.json';

import { Apikeys } from '../common/entities/api-key.entity';

async function seedNew(repository: MongoRepository<News>, news: Partial<News>) {
  const item = await repository.findOneBy({ id: news.id });
  if (item) return;

  await repository.save(news);
}

export async function seedNews(connection: DataSource) {
  console.log('+ Seeding News');

  const manager = connection.mongoManager;
  const repository = manager.getMongoRepository(News);

  for (const news of value) {
    await seedNew(repository, news as unknown as News);
  }

  console.log('- News done');
}

export async function seedKeys(connection: DataSource) {
  console.log('+ Seeding Keys');

  const manager = connection.mongoManager;
  const repository = manager.getMongoRepository(Apikeys);

  await repository.save({ key: '123456', host: 'localhost' });

  console.log('- Keys done');
}

(async () => {
  const datasource = new DataSource(DatabaseConfig.get);

  await datasource.initialize();
  await seedNews(datasource);
  await seedKeys(datasource);
})().then(() => {
  console.log('Seed finished');
  process.exit();
});
