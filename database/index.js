const mysql = require('mysql2');

 // connexon avec la base de donnée
const pool = mysql.createPool({
    host: 'localhost',
    user: 'nyamsi',
    password: 'root',
    database: 'examen',
});

module.exports = pool.promise()