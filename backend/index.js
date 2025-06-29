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
  const status = req.query.status || 'VALIDACAO';

  const query = `
    SELECT 
      a.id_agendamento,
      a.data,
      a.horario,
      a.status,
      f.nome AS nome_familiar,
      i.nome AS nome_interna,
      u.nome AS unidade
    FROM agendamento a
    JOIN familiar f ON f.id_familia = a.id_familia
    JOIN interna i ON i.id_interna = a.id_interna
    JOIN unidade u ON u.id_unidade = i.id_unidade
    WHERE a.status = $1
    ORDER BY a.data, a.horario
  `;

  try {
    const resultado = await pool.query(query, [status]);
    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ erro: 'Erro ao buscar agendamentos' });
  }
});

app.patch('/api/agendamentos/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['APROVADO', 'REJEITADO'].includes(status)) {
    return res.status(400).json({ erro: 'Status inválido' });
  }

  try {
    await pool.query(
      'UPDATE agendamento SET status = $1 WHERE id_agendamento = $2',
      [status, id]
    );
    res.json({ sucesso: true });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ erro: 'Erro ao atualizar status do agendamento' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM gestor WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (result.rows.length > 0) {
      res.json({ sucesso: true, gestor: result.rows[0] });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao autenticar gestor:', error);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Tentar login como gestor
    const gestor = await pool.query('SELECT * FROM gestor WHERE email = $1 AND senha = $2', [email, senha]);
    if (gestor.rows.length) {
      return res.json({ tipo: 'gestor', nome: gestor.rows[0].nome });
    }

    // Tentar login como familiar
    const familiar = await pool.query('SELECT * FROM familiar WHERE email = $1 AND senha = $2', [email, senha]);
    if (familiar.rows.length) {
      return res.json({ tipo: 'familiar', nome: familiar.rows[0].nome });
    }

    res.status(401).json({ erro: 'Credenciais inválidas' });
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

