import type { Knex } from 'knex';
import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // PostgreSQL client
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations', // Path to migration files
    },
    seeds: {
      directory: './seeds', // Path to seed files (optional)
    },
  },
};

export default config;