const empresaModel = require('../models/empresaModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const criarEmpresa = async (req, res) => {
  const { nome, senha, endereco, cnpj } = req.body;

  try {
    // Verificar se a empresa já existe
    const empresaExistente = await empresaModel.getEmpresaByName(nome);
    if (empresaExistente) {
      return res.status(400).json({ message: 'Já existe uma empresa com este nome.' });
    }

    // Criar a empresa
    const empresaId = await empresaModel.createEmpresa(nome, senha, endereco, cnpj);

    res.status(201).json({ message: 'Empresa criada com sucesso!', id: empresaId });
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ message: 'Erro ao criar empresa.' });
  }
};

const listarEmpresas = async (req, res) => {
  try {
    const empresas = await empresaModel.getAllEmpresas();
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Erro ao listar empresas:', error);
    res.status(500).json({ message: 'Erro ao listar empresas.' });
  }
};

const editarEmpresa = async (req, res) => {
  const empresaId = req.params.id;
  const { nome, senha, endereco, cnpj } = req.body;

  try {
    const empresaAtualizada = await empresaModel.updateEmpresa(empresaId, nome, senha, endereco, cnpj);
    if (empresaAtualizada) {
      res.status(200).json({ message: 'Empresa atualizada com sucesso!' });
    } else {
      res.status(404).json({ message: 'Empresa não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao editar empresa:', error);
    res.status(500).json({ message: 'Erro ao editar empresa.' });
  }
};

const excluirEmpresa = async (req, res) => {
  const empresaId = req.params.id;

  try {
    const empresaExcluida = await empresaModel.deleteEmpresa(empresaId);
    if (empresaExcluida) {
      res.status(200).json({ message: 'Empresa excluída com sucesso!' });
    } else {
      res.status(404).json({ message: 'Empresa não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    res.status(500).json({ message: 'Erro ao excluir empresa.' });
  }
};

const loginEmpresa = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const empresa = await empresaModel.getEmpresaByName(nome);

    if (!empresa) {
      return res.status(401).json({ message: 'Empresa não encontrada.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, empresa.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ empresaId: empresa.id }, 'EFB3FCcl');
    res.status(200).json({ 
      token,
      tipoUsuario: 'empresa' 
    });
  } catch (error) {
    console.error('Erro no login da empresa:', error);
    res.status(500).json({ message: 'Erro no login da empresa.' });
  }
};

module.exports = {
  criarEmpresa,
  listarEmpresas,
  editarEmpresa,
  excluirEmpresa,
  loginEmpresa
};