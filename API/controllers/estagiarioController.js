
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool1 = require('../models/estagiarioModel');
const { pool } = require('../models/estagiarioModel');

const registrar = async (req, res) => {
  const { nome_completo, data_nascimento, email, senha, username, ativo } = req.body;

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir o usuário no banco de dados (usando a função do model)
    const userId = await pool1.createEstagiario(nome_completo, data_nascimento, email, hashedPassword, username, ativo);

    const token = jwt.sign({ userId }, 'EFB3FCcl');

    res.status(201).json({ message: 'Estagiario registrado com sucesso!', token }); // Enviar o token na resposta
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      // Erro de violação de restrição UNIQUE (email ou username já existe)
      if (error.constraint === 'usuarios_email_key') {
        res.status(400).json({ message: 'Email já cadastrado' });
      } else if (error.constraint === 'usuarios_username_key') {
        res.status(400).json({ message: 'Username já cadastrado' });
      } else {
        res.status(500).json({ message: 'Erro ao registrar usuário' });
      }
    } else {
      res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  }
};

const listar_estagiario = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estagiario'); 
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar estagiarios:', error);
    res.status(500).json({ message: 'Erro ao buscar estagiarios' });
  }
};


const excluirEstagiario = async (req, res) => {
  const estagiarioId = parseInt(req.params.id, 10);

  try {
    const result = await pool.query('DELETE FROM estagiario WHERE id = $1', [estagiarioId]);

    if (result.rowCount === 1) {
      res.status(200).json({ message: 'Estagiário excluído com sucesso!' });
    } else {
      res.status(404).json({ message: 'Estagiário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao excluir estagiário:', error);
    res.status(500).json({ message: 'Erro ao excluir estagiário.' });
  }
};


const editarEstagiario = async (req, res) => {
  const estagiarioId = req.params.id;
  const { nome_completo, data_nascimento, email, senha, username, ativo } = req.body;

  try {
    const result = await pool.query(
      'UPDATE estagiario SET nome_completo = $1, data_nascimento = $2, email = $3, senha = $4, username = $5, ativo = $6 WHERE id = $7',
      [nome_completo, data_nascimento, email, senha, username, ativo, estagiarioId]
    );

    if (result.rowCount === 1) {
      res.status(200).json({ message: 'Estagiário atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Estagiário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar estagiário:', error);
    res.status(500).json({ message: 'Erro ao atualizar estagiário.' });
  }
};

const buscarEstagiarioPorId = async (req, res) => {
  const estagiarioId = parseInt(req.params.id, 10);

  try {
    const result = await pool.query('SELECT * FROM estagiario WHERE id = $1', [estagiarioId]);
    if (result.rows.length === 1) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Estagiário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar estagiário:', error);
    res.status(500).json({ message: 'Erro ao buscar estagiário.' });
  }
};

module.exports = { 
  registrar,
  listar_estagiario,
  excluirEstagiario,
  editarEstagiario,
  buscarEstagiarioPorId,
 };