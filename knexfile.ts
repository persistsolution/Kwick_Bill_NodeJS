import 'dotenv/config'; // Loads environment variables from .env

const config = {
  development: {
    client: 'pg', // Use PostgreSQL as the database client
    connection: {
      host: process.env.DB_HOST || 'localhost', // Host from environment or default to localhost
      user: process.env.DB_USER || 'postgres', // Database username
      password: process.env.DB_PASSWORD || 'pgrajat', // Database password
      database: process.env.DB_NAME || 'kwickbill', // Database name
      port: Number(process.env.DB_PORT) || 5432, // Port number
    },
    migrations: {
      directory: './migrations', // Directory for migration files
      extension: 'ts', // Use TypeScript for migration files
    },
    seeds: {
      directory: './seeds', // Directory for seed files
    },
  },
  production: {
    client: 'pg', // Production database configuration
    connection: {
      host: process.env.PROD_DB_HOST,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      port: Number(process.env.PROD_DB_PORT) || 5432,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;