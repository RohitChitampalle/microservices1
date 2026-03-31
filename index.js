const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'userconfig',
  password: 'postgres',
  port: 5432
});

app.post('/users', async (req, res) => {
  const { name, phone, role } = req.body;
  const result = await pool.query(
    'INSERT INTO users(name, phone, role) VALUES($1,$2,$3) RETURNING *',
    [name, phone, role]
  );
  res.json(result.rows[0]);
});

app.post('/partners/register', async (req, res) => {
  const { user_id, license_number } = req.body;
  const result = await pool.query(
    'INSERT INTO partners(user_id, license_number, kyc_status) VALUES($1,$2,$3) RETURNING *',
    [user_id, license_number, 'PENDING']
  );
  res.json(result.rows[0]);
});

app.put('/partners/approve/:id', async (req, res) => {
  const result = await pool.query(
    "UPDATE partners SET kyc_status='APPROVED' WHERE id=$1 RETURNING *",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

app.get('/partners/:id', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM partners WHERE id=$1',
    [req.params.id]
  );
  res.json(result.rows[0]);
});

app.listen(3001, () => console.log('UserConfig running'));