import dotenv from "dotenv";
dotenv.config();

const development = {
  username: process.env.TASKS_DB_USER,
  password: process.env.TASKS_DB_PASSWORD,
  database: process.env.TASKS_DB_NAME,
  host: process.env.TASKS_DB_HOST,
  port: process.env.TASKS_DB_PORT,
  dialect: process.env.TASKS_DB_DIALECT,
  logging: false,
};
const test = {
  username: process.env.TASKS_DB_USER,
  password: process.env.TASKS_DB_PASSWORD,
  database: process.env.TASKS_DB_NAME,
  host: process.env.TASKS_DB_HOST,
  port: process.env.TASKS_DB_PORT,
  dialect: process.env.TASKS_DB_DIALECT,
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  use_env_variable: "DATABASE_URL",
};
const production = {
  username: process.env.TASKS_DB_USER,
  password: process.env.TASKS_DB_PASSWORD,
  database: process.env.TASKS_DB_NAME,
  host: process.env.TASKS_DB_HOST,
  port: process.env.TASKS_DB_PORT,
  dialect: process.env.TASKS_DB_DIALECT,
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  use_env_variable: "DATABASE_URL",
};

export default { development, test, production };
