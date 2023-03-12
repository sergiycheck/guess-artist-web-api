import dotenv from 'dotenv';
import path from 'node:path';
import z from 'zod';

const pathEnv = path.resolve(process.cwd(), '.env.development');
dotenv.config({ path: pathEnv });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    monboDbConnectionString: process.env.MONDB_DB_CONN_STR,
  },
  populate: parseInt(process.env.POPULATE, 10) ?? 0,
};

const configSchema = z.object({
  NODE_ENV: z.string(),
  port: z.number(),
  database: z.object({
    monboDbConnectionString: z.string(),
  }),
  populate: z.number(),
});

export default configSchema.parse(config);
