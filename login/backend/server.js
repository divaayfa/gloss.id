const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

// ================= DB =================
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'glossdb',
  password: 'Diva2912',
  port: 5432,
});

// ================= LOGIN =================
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE username=$1 AND password=$2',
      [username, password]
    );

    res.json({ success: result.rows.length > 0 });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
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

// GET
app.get('/transaksi', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transaksi ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
app.post('/transaksi', async (req, res) => {
  try {
    let { no, tanggal, nama, jumlah } = req.body;

    no = Number(no);
    jumlah = Number(jumlah);

    await pool.query(
      'INSERT INTO transaksi (no, tanggal, nama, jumlah) VALUES ($1,$2,$3,$4)',
      [no, tanggal, nama, jumlah]
    );

    res.json({ message: "OK" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/transaksi/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM transaksi WHERE id=$1', [id]);

    res.json({ message: "deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
app.put('/transaksi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { no, tanggal, nama, jumlah } = req.body;

    await pool.query(
      'UPDATE transaksi SET no=$1, tanggal=$2, nama=$3, jumlah=$4 WHERE id=$5',
      [no, tanggal, nama, jumlah, id]
    );

    res.json({ message: "updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= START =================
app.listen(3000, () => {
  console.log("Server running di http://localhost:3000");
});