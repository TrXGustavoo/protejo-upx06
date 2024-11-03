const bcrypt = require('bcryptjs');
const pool = require('../models/usuarioModel');

const registrar = async (req, res) => {
  const { nome_completo, data_nascimento, email, senha, username } = req.body;

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir o usuário no banco de dados (usando a função do model)
    const userId = await pool.createUser(nome_completo, data_nascimento, email, hashedPassword, username);

    const token = jwt.sign({ userId }, 'EFB3FCcl');

    res.status(201).json({ message: 'Usuário registrado com sucesso!', token }); // Enviar o token na resposta
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

module.exports = { registrar };