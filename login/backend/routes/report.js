const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/report', async (req, res) => {

  const income = await pool.query(
    "SELECT COALESCE(SUM(amount),0) FROM transactions WHERE type='income'"
  );

  const expense = await pool.query(
    "SELECT COALESCE(SUM(amount),0) FROM transactions WHERE type='expense'"
  );

  const sales = await pool.query(
    "SELECT amount FROM transactions ORDER BY id ASC LIMIT 7"
  );

  res.json({
    income: income.rows[0].coalesce,
    expense: expense.rows[0].coalesce,
    sales: sales.rows.map(s => s.amount),
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  });

});

module.exports = router;