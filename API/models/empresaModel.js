const pg = require('pg');
const bcrypt = require('bcryptjs');


const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'upx06',
    password: 'EFB3FCcl',
    port: 5432,
});


const createEmpresa = async (nome, senha, endereco, cnpj) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const result = await pool.query(
            'INSERT INTO empresa (nome, senha, endereco, cnpj) VALUES ($1, $2, $3, $4) RETURNING id',
            [nome, hashedPassword, endereco, cnpj]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
        throw new Error('Erro ao criar empresa no banco de dados.');
    }
};

const getEmpresaById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM empresa WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar empresa por ID:', error);
    throw new Error('Erro ao buscar empresa no banco de dados.');
  }
};

const getEmpresaByName = async (nome) => {
  try {
    const result = await pool.query('SELECT * FROM empresa WHERE nome = $1', [nome]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar empresa por nome:', error);
    throw new Error('Erro ao buscar empresa no banco de dados.');
  }
};


const updateEmpresa = async (id, nome, senha, endereco, cnpj) => { 
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const result = await pool.query(
            'UPDATE empresa SET nome = $1, senha = $2, endereco = $3, cnpj = $4 WHERE id = $5',
            [nome, hashedPassword, endereco, cnpj, id]
        );
        return result.rowCount === 1;
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error);
        throw new Error('Erro ao atualizar empresa no banco de dados.');
    }
};

const deleteEmpresa = async (id) => {
  try {
    const result = await pool.query('DELETE FROM empresa WHERE id = $1', [id]);
    return result.rowCount === 1;
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    throw new Error('Erro ao excluir empresa no banco de dados.');
  }
};

const getAllEmpresas = async () => {
  try {
    const result = await pool.query('SELECT * FROM empresa');
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    throw new Error('Erro ao buscar empresas no banco de dados.');
  }
};

module.exports = {
  createEmpresa,
  getEmpresaById,
  getEmpresaByName,
  updateEmpresa,
  deleteEmpresa,
  getAllEmpresas
};