const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const authRoutes = require('./views/authRoutes');
const usuarioRoutes = require('./views/usuarioRoutes');
const professoresRoutes = require('./views/professoresRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/professores', professoresRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});



