const mysql = require('mysql2');

const db = mysql.createConnection({
  host: /'localhost',//'server_name',
  user: '',
  password: '',
  database: ''
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


module.exports = db;
