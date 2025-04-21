import { knex } from "knex";
import 'dotenv/config';

export const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST, // Update with your DB host
    user: process.env.DB_USER, // Update with your DB username
    password: process.env.DB_PASSWORD, // Update with your DB password
    database: process.env.DB_NAME, // Update with your DB name
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations", // Directory for migration files
  },
  seeds: {
    directory: "./seeds", // Directory for seed files
  }, 
});