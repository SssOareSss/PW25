const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar à base de dados MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/alunos', require('./routes/alunos.routes'));
app.use('/api/cursos', require('./routes/cursos.routes'));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr em http://localhost:${PORT}`);
});
