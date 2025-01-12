// testConnection.js
require('dotenv').config();
const knex = require('knex');
const config = require('./knexfile').test;

console.log('Attempting to connect with config:', {
  host: config.connection.host,
  user: config.connection.user,
  database: config.connection.database,
  port: config.connection.port,
  password: config.connection.password ? '[PASSWORD SET]' : '[NO PASSWORD]'
});

const db = knex(config);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
