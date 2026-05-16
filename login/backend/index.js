const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, '../public')));

// login langsung di server
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'gloss.id') {
    return res.json({
      success: true,
      message: 'Login berhasil'
    });
  }

  res.json({
    success: false,
    message: 'Username / password salah'
  });
});

// home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port:", PORT);
});