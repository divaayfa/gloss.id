const path = require('path');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

// ================= FRONTEND =================
app.use(express.static(path.join(__dirname, 'public')));

// ================= DATABASE =================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ================= HOME =================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ================= TEST =================
app.get('/test', (req, res) => {
  res.send('WEB OK');
});

// ================= LOGIN (FIX UTAMA) =================
// pakai ini biar tidak 404 di Railway
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE username=$1 AND password=$2',
      [username, password]
    );

    if (result.rows.length > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Username / password salah" });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ================= BARANG =================
app.get('/barang', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM barang ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= KEUANGAN =================
app.get('/keuangan', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM keuangan ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= TRANSAKSI =================
app.get('/transaksi', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transaksi ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/transaksi', async (req, res) => {
  try {
    let { no, tanggal, nama, jumlah } = req.body;

    await pool.query(
      'INSERT INTO transaksi (no, tanggal, nama, jumlah) VALUES ($1,$2,$3,$4)',
      [Number(no), tanggal, nama, Number(jumlah)]
    );

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/transaksi/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM transaksi WHERE id=$1', [req.params.id]);
    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/transaksi/:id', async (req, res) => {
  try {
    const { no, tanggal, nama, jumlah } = req.body;

    await pool.query(
      'UPDATE transaksi SET no=$1, tanggal=$2, nama=$3, jumlah=$4 WHERE id=$5',
      [no, tanggal, nama, jumlah, req.params.id]
    );

    res.json({ message: 'updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= START =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port:", PORT);
});