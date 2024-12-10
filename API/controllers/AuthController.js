const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/estagiarioModel').pool;
const gestorModel = require('../models/gestorModel').pool;

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se é um estagiário
    let usuario = await pool.query('SELECT * FROM estagiario WHERE email = $1', [email]);
    let tipoUsuario = 'estagiario';
    let userId; // Declarar a variável userId

    // Se não for estagiário, verificar se é um gestor
    if (usuario.rows.length === 0) {
      usuario = await gestorModel.query('SELECT * FROM gestor WHERE email = $1', [email]);
      tipoUsuario = 'gestor';
    }

    // Se não for nenhum dos dois, retornar erro
    if (usuario.rows.length === 0) { // Corrigido: verificar o length do array usuario.rows
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Gerar o token com base no tipo de usuário
    let token;
    if (tipoUsuario === 'estagiario') {
      token = jwt.sign({ userId: usuario.rows[0].id, tipoUsuario: 'estagiario' }, 'EFB3FCcl');
      userId = usuario.rows[0].id; // Atribuir o ID do usuário
      empresaId = usuario.rows[0].empresa_id; // Atribuir o ID da empresa
    } else {
      token = jwt.sign({ gestorId: usuario.rows[0].id, tipoUsuario: 'gestor' }, 'EFB3FCcl');
      userId = usuario.rows[0].id; // Atribuir o ID do usuário
      empresaId = usuario.rows[0].empresa_id; // Atribuir o ID da empresa
    }

    console.log('usuario:', userId);
    res.status(200).json({ token, tipoUsuario, userId, empresaId}); // Incluir userId na resposta

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no login.' });
  }
};

module.exports = { login };