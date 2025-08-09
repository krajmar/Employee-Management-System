const express = require('express');
const cors = require('cors');
const db = require('./dbConn');
const { adminRouter } = require( "./Routes/AdminRoute");

const app = express();
const PORT = 1411;

app.use(cors({
  origin: ["http://88.200.63.148:1410"],
  methods: [
    'GET', 'POST', 'PUT', 'DELETE'
  ],
  credentials: true
}));

app.use(express.static('Public'))
app.use('/Images', express.static('Public/Images'));

app.use(express.json());

app.use('/auth', adminRouter);



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
