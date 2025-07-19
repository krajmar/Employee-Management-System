const mysql = require('mysql2');

const db = mysql.createConnection({
  host: /'localhost',//'88.200.63.148',
  user: 'codeigniter',
  password: 'codeigniter2019',
  database: 'SISIII2025_89231110'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;