const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2)',
    [username, hash]
  );

  res.json({ message: 'Register berhasil' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users WHERE username=$1',
    [username]
  );

  if (result.rows.length === 0) {
    return res.json({ message: 'User tidak ditemukan' });
  }

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.json({ message: 'Password salah' });
  }

  res.json({ message: 'Login berhasil' });
});

module.exports = router;