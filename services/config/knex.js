require('dotenv').config();
const knexLib = require('knex');

const createKnexInstance = (schema) => {
  return knexLib({
    client: process.env.DB_TYPE,
    connection: {
      // timezone: 'utc',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: schema || process.env.DB_NAME,
      port: process.env.DB_PORT,
      charset: 'utf8mb4'
    },
  });
};

module.exports = createKnexInstance;