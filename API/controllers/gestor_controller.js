const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/gestorModel'); // Alterado para professorModel

const registrar = async (req, res) => {
  const { nome_completo, data_nascimento, email, senha, username, disciplina } = req.body; // Adicionado disciplina

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const professorId = await pool.createProfessor(nome_completo, data_nascimento, email, hashedPassword, username, disciplina);

    const token = jwt.sign({ professorId }, 'EFB3FCcl'); // Alterado para professorId

    res.status(201).json({ message: 'Professor registrado com sucesso!', token });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      // Erro de violação de restrição UNIQUE (email ou username já existe)
      if (error.constraint === 'professores_email_key') { 
        res.status(400).json({ message: 'Email já cadastrado' });
      } else if (error.constraint === 'professores_username_key') { 
        res.status(400).json({ message: 'Username já cadastrado' });
      } else {
        res.status(500).json({ message: 'Erro ao registrar professor' });
      }                                             
    } else {
      res.status(500).json({ message: 'Erro ao registrar professor' });
    }
  }
};

module.exports = { registrar };