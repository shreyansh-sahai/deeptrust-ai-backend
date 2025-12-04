import type { PrismaConfig } from 'prisma';
import { Config } from './src/common/util/config';
import * as dotenv from 'dotenv';

dotenv.config();

const config: PrismaConfig = {
  experimental: {
    externalTables: false,
  },
  schema: 'src/infrastructure/schema.prisma',
  migrations: {
    path: 'src/infrastructure/migrations',
  },
  datasource: {
    url: Config.databaseUrl,
  },
};

export default config;
