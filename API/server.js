const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const authRoutes = require('./views/authRoutes');
const estagiarioRoutes = require('./views/estagiarioRoutes');
const gestor_routes = require('./views/gestor_routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/estagiarios', estagiarioRoutes);
app.use('/gestores', gestor_routes);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});



