const knex = require('knex');
const knexfile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
console.log('Current environment:', environment);

const connectionConfig = knexfile[environment];
console.log('Using database:', connectionConfig.connection.database);

const db = knex(connectionConfig);

// 연결 테스트
db.raw('SELECT current_database()')
  .then(result => {
    console.log('Successfully connected to:', result.rows[0].current_database);
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = db;
