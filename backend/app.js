const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const alunosRouter = require('./routes/alunos.routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use('/alunos', alunosRouter);

app.get('/', (req, res) => res.send('API Backend funcionando'));

module.exports = app;
