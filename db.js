const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'N3na2202$$',
  database: 'prueba_pasante'
});
conn.connect();
module.exports = conn;