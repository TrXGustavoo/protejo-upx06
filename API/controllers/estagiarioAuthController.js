const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/estagiarioModel').pool; 
const nodemailer = require('nodemailer');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query('SELECT * FROM estagiario WHERE email = $1', [email]);

    if (usuario.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ userId: usuario.rows[0].id }, 'EFB3FCcl'); 

    // Adicionando o tipo de usuário à resposta
    res.status(200).json({ 
      token, 
      tipoUsuario: 'aprendiz' // Tipo de usuário fixo como 'aprendiz'
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no login.' });
  }
};

module.exports = { login };