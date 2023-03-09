import dotenv from 'dotenv';
import path from 'node:path';

const pathEnv = path.resolve(process.cwd(), '.env.development');
dotenv.config({ path: pathEnv });

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  moralis: {
    apiKey: process.env.moralis_api_key,
  },
};

export default config;
