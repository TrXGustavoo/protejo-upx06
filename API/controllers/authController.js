const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/estagiarioModel'); 
const nodemailer = require('nodemailer');


const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Buscar o usuário no banco de dados (usando a função do model)
    const user = await pool.getUserByEmail(email);

    if (user) {
      // Comparar a senha fornecida com a senha hash armazenada
      const passwordMatch = await bcrypt.compare(senha, user.senha);

      if (passwordMatch) {
        // Gerar um token JWT 
        const token = jwt.sign({ userId: user.id }, 'EFB3FCcl');
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Senha incorreta' });
      }
    } else {
      res.status(401).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};


module.exports = { login};