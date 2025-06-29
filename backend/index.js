import express from 'express';
import pool from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/familiares', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM familiares');
  res.json(resultado.rows);
});

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});
