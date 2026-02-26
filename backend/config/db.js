const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// pool de conexiones mysql con variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
