const pg = require('pg');

// Configurar a conexão com o PostgreSQL (substitua pelas suas informações)
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'upx06',
    password: 'EFB3FCcl',
    port: 5432,
  });
const createProfessor = async (nome_completo, data_nascimento, email, senha, username, disciplina) => { // Adicionado disciplina
  const result = await pool.query(
    'INSERT INTO professores (nome_completo, data_nascimento, email, senha, username, disciplina) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', // Alterado para professores e adicionado disciplina
    [nome_completo, data_nascimento, email, senha, username, disciplina] 
  );
  return result.rows[0].id;
};

const getProfessorByEmail = async (email) => { 
  const result = await pool.query('SELECT * FROM professores WHERE email = $1', [email]); 
};

const updateProfessorPassword = async (email, senha) => { 
  await pool.query('UPDATE professores SET senha = $1 WHERE email = $2', [senha, email]); 
};

module.exports = {
  createProfessor, 
  getProfessorByEmail, 
  updateProfessorPassword, 
  pool,
};