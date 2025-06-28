require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz para teste simples
app.get('/', (req, res) => {
  res.send('🎉 API da Biblioteca está a funcionar!');
});

// Rotas da API
app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);

// Conexão ao MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API a correr na porta ${port}`));
  })
  .catch(err => console.error('Erro na conexão MongoDB:', err));