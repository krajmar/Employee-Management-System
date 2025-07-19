const express = require('express');
const cors = require('cors');
const db = require('./dbConn');

const app = express();
const PORT = 1411;

app.use(cors());
app.use(express.json());


// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.get('/api/test-db', (req, res) => {
  db.query('SELECT NOW() as now', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://88.200.63.148:${PORT}`);
});
