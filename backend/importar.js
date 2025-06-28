require('dotenv').config();
const mongoose = require('mongoose');
const alunos = require('./alunos.json');
const cursos = require('./cursos.json');

const alunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number
});

const cursoSchema = new mongoose.Schema({
  nomeDoCurso: String
});

const Aluno = mongoose.model('Aluno', alunoSchema);
const Curso = mongoose.model('Curso', cursoSchema);

// Debug: mostrar a string de conexão para garantir que está correta
console.log('URI de conexão:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Ligado ao MongoDB Atlas!");

    // Limpar coleções antes de inserir
    await Aluno.deleteMany({});
    await Curso.deleteMany({});

    // Inserir dados importados
    await Aluno.insertMany(alunos);
    await Curso.insertMany(cursos);

    console.log("Dados importados com sucesso!");
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error("Erro ao conectar ou importar dados:", err);
  });

