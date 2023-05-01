import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

type Environment = {
  port: () => string;
  environment: () => string;
  dbConfig: () => {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
};

export const EnvConfig: Environment = {
  port: () => env.PORT,
  environment: () => env.ENVIRONMENT,
  dbConfig: () => ({
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  }),
};
