const API_URL = 'http://localhost:3000/alunos';

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('alunos-tbody');

  // Modal edição e elementos
  const modalEditar = document.getElementById('modal-editar');
  const fecharEditar = document.getElementById('fechar-editar');
  const formEditar = document.getElementById('form-editar');

  // Modal apagar e elementos
  const modalApagar = document.getElementById('modal-apagar');
  const fecharApagar = document.getElementById('fechar-apagar');
  const btnConfirmarApagar = document.getElementById('confirmar-apagar');
  const btnCancelarApagar = document.getElementById('cancelar-apagar');

  let alunoIdParaApagar = null;

  // Carrega lista de alunos da API
  async function carregarAlunos() {
    const resposta = await fetch(API_URL);
    const alunos = await resposta.json();

    tbody.innerHTML = '';
    alunos.forEach(aluno => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.apelido}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.anoCurricular}</td>
        <td>
          <button onclick="abrirModalEditar(${aluno.id})">✏️</button>
          <button onclick="abrirModalApagar(${aluno.id})">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Abre modal edição e pré-preenche o formulário
  window.abrirModalEditar = async function(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const aluno = await res.json();

    document.getElementById('edit-nome').value = aluno.nome;
    document.getElementById('edit-apelido').value = aluno.apelido;
    document.getElementById('edit-curso').value = aluno.curso;
    document.getElementById('edit-anoCurricular').value = aluno.anoCurricular;

    modalEditar.style.display = 'flex';
    formEditar.dataset.alunoId = id;
  };

  // Fecha modal edição
  fecharEditar.onclick = () => {
    modalEditar.style.display = 'none';
  };

  // Guarda alterações edição
  formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = formEditar.dataset.alunoId;
    const alunoEditado = {
      nome: document.getElementById('edit-nome').value,
      apelido: document.getElementById('edit-apelido').value,
      curso: document.getElementById('edit-curso').value,
      anoCurricular: parseInt(document.getElementById('edit-anoCurricular').value)
    };

    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoEditado)
    });

    modalEditar.style.display = 'none';
    carregarAlunos();
  });

  // Abre modal apagar
  window.abrirModalApagar = function(id) {
    alunoIdParaApagar = id;
    modalApagar.style.display = 'flex';
  };

  // Fecha modal apagar
  fecharApagar.onclick = () => {
    modalApagar.style.display = 'none';
  };
  btnCancelarApagar.onclick = () => {
    modalApagar.style.display = 'none';
  };

  // Confirmar apagar aluno
  btnConfirmarApagar.onclick = async () => {
    if (alunoIdParaApagar) {
      await fetch(`${API_URL}/${alunoIdParaApagar}`, { method: 'DELETE' });
      alunoIdParaApagar = null;
      modalApagar.style.display = 'none';
      carregarAlunos();
    }
  };

  // Fecha modal se clicar fora da box
  window.onclick = function(event) {
    if (event.target === modalEditar) modalEditar.style.display = 'none';
    if (event.target === modalApagar) modalApagar.style.display = 'none';
  };

  // Inicializa carregamento da tabela
  carregarAlunos();
});
