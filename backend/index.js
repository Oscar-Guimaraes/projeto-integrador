import express from 'express';
import pool from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/familiares', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM familiar');
  res.json(resultado.rows);
});

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});

app.get('/api/unidades', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM unidade ORDER BY nome');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar unidades:', error);
    res.status(500).json({ erro: 'Erro ao buscar unidades' });
  }
});

app.get('/api/familiares', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM familiar ORDER BY nome');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar familiares:', error);
    res.status(500).json({ erro: 'Erro ao buscar familiares' });
  }
});

app.get('/api/internas', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM interna ORDER BY nome');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar internas:', error);
    res.status(500).json({ erro: 'Erro ao buscar internas' });
  }
});

app.get('/api/agendamentos', async (req, res) => {
  try {
    const query = `
      SELECT 
        a.id_agendamento,
        a.data,
        a.horario,
        f.nome AS nome_familiar,
        i.nome AS nome_interna,
        u.nome AS unidade
      FROM agendamento a
      JOIN familiar f ON f.id_familia = a.id_familia
      JOIN interna i ON i.id_interna = a.id_interna
      JOIN unidade u ON u.id_unidade = i.id_unidade
      ORDER BY a.data, a.horario
    `;
    const resultado = await pool.query(query);
    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ erro: 'Erro ao buscar agendamentos' });
  }
});