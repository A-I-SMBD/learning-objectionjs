import { Knex } from 'knex';
import 'dotenv/config';

type DbClient = 'postgresql';

type KnexConfig = Knex.Config & { client: DbClient };

type KnexConfigName = 'development';

const knexConfigs: Record<KnexConfigName, KnexConfig> = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'test',
      user: 'postgres',
      password: process.env.POSTGRESQL_DEV_PASSWORD,
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default knexConfigs;
