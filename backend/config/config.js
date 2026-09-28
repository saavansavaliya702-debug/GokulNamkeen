require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 2,
      acquire: 600000,
      idle: 10000,
    },
    timezone: "+00:00",
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 0,
      acquire: 600000,
      idle: 10000,
    },
    timezone: "+00:00",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    pool: {
      max: 20,
      min: 0,
      acquire: 600000,
      idle: 10000,
    },
    timezone: "+00:00",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
