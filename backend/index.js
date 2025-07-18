const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 1411;

app.use(cors());
app.use(express.json());

// Connect to MySQL
/*const db = mysql.createConnection({
  host: '88.200.63.148',
  user: 'codeigniter',
  password: 'codeigniter2019',
  database: 'SISIII2024_89231110'
});

/*db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});*/

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://88.200.63.148:${PORT}`);
});
