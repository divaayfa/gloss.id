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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
