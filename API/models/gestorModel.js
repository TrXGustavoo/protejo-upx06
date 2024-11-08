const pg = require('pg');

// Configurar a conexão com o PostgreSQL (substitua pelas suas informações)
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'upx06',
    password: 'EFB3FCcl',
    port: 5432,
  });
const createGestor = async (nome_completo, data_nascimento, email, senha, username, empresa) => { 
  const result = await pool.query(
    'INSERT INTO gestor (nome_completo, data_nascimento, email, senha, username, empresa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', 
    [nome_completo, data_nascimento, email, senha, username, empresa] 
  );
  return result.rows[0].id;
};

const getGestorByEmail = async (email) => { 
  const result = await pool.query('SELECT * FROM gestor WHERE email = $1', [email]); 
};

const updateGestorPassword = async (email, senha) => { 
  await pool.query('UPDATE gestor SET senha = $1 WHERE email = $2', [senha, email]); 
};

module.exports = {
  createGestor, 
  getGestorByEmail, 
  updateGestorPassword, 
  pool,
};