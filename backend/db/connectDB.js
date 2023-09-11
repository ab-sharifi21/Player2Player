// Conexion base de datos
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
/*     database: process.env.MYSQL_DB_NAME, */
    password: process.env.MYSQL_PASSWORD,
    timezone: 'local'
};

let pool;

async function getPool () {
    if (!pool) {
        pool = await mysql.createPool(dbConfig);
    }

    return pool;
}

module.exports = getPool;
