const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

// route utama
app.get('/', (req, res) => {
  res.send('Server jalan!');
});

// route login
app.use('/api', authRoutes);

const reportRoutes = require('./routes/report');
app.use('/api', reportRoutes);

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});

