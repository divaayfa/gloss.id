const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inventory_db',
  password: 'diva',
  port: 5432,
});

module.exports = pool;