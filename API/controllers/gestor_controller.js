const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/gestorModel'); // Alterado para professorModel

const registrar = async (req, res) => {
  const { nome_completo, data_nascimento, email, senha, username, empresa } = req.body; // Adicionado empresa

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const gestorId = await pool.createGestor(nome_completo, data_nascimento, email, hashedPassword, username, empresa);

    const token = jwt.sign({ gestorId }, 'EFB3FCcl'); // Alterado para gestorId

    res.status(201).json({ message: 'gestor registrado com sucesso!', token });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      // Erro de violação de restrição UNIQUE (email ou username já existe)
      if (error.constraint === 'gestores_email_key') { 
        res.status(400).json({ message: 'Email já cadastrado' });
      } else if (error.constraint === 'gestores_username_key') { 
        res.status(400).json({ message: 'Username já cadastrado' });
      } else {
        res.status(500).json({ message: 'Erro ao registrar gestor' });
      }                                             
    } else {
      res.status(500).json({ message: 'Erro ao registrar gestor' });
    }
  }
};

module.exports = { registrar };