const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report');

// API routes
app.use('/api', authRoutes);
app.use('/api', reportRoutes);

// ================= ROUTE UTAMA =================
app.get('/', (req, res) => {
  res.send('Server jalan!');
});

// ================= START SERVER =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});