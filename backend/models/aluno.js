const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // ID numérico definido manualmente
  nome: { type: String, required: true },
  apelido: { type: String, required: true },
  curso: { type: String, required: true },
  anoCurricular: { type: Number, required: true }
});

module.exports = mongoose.model('Aluno', alunoSchema);