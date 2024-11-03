// Configurar a conexão com o PostgreSQL
const pg = require('pg');

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'upx06',
    password: 'EFB3FCcl',
    port: 5432,
  });

const createUser = async (nome_completo, data_nascimento, email, senha, username) => {
    const result = await pool.query(
      'INSERT INTO usuarios (nome_completo, data_nascimento, email, senha, username) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nome_completo, data_nascimento, email, senha, username]
    );
    return result.rows[0].id;
  };
  
  const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  };
  
  const updateUserPassword = async (email, senha) => {
    await pool.query('UPDATE usuarios SET senha = $1 WHERE email = $2', [senha, email]);
  };
  
  module.exports = {
    createUser,
    getUserByEmail,
    updateUserPassword,
    pool, // Exportar a pool para ser usada nos controllers
  };