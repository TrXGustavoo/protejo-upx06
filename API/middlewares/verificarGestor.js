const jwt = require('jsonwebtoken');

const verificarGestor = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'EFB3FCcl'); 

    if (decoded.gestorId) {
      req.usuario = decoded; 
      next();
    } else {
      return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem acessar esta rota.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verificarGestor;