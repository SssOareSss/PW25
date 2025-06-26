const baseUrl = 'http://localhost:3001/alunos';
const form = document.getElementById('form-aluno');
const lista = document.getElementById('lista-alunos');
const cancelarBtn = document.getElementById('cancelar');

async function fetchAlunos() {
    const res = await fetch(baseUrl);
    const alunos = await res.json();
    lista.innerHTML = '';
    alunos.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${a.nome}</td>
        <td>${a.apelido}</td>
        <td>${a.curso}</td>
        <td>${a.anoCurricular}</td>
        <td>
          <button onclick="editar('${a.id}')">✏️</button>
          <button onclick="apagar('${a.id}')">🗑️</button>
        </td>
      `;
      lista.appendChild(tr);
    });
  }
  

form.addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('aluno-id').value;
  const aluno = {
    nome: form.nome.value,
    apelido: form.apelido.value,
    curso: form.curso.value,
    anoCurricular: parseInt(form.anoCurricular.value)
  };

  if (id) {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(aluno)
    });
  } else {
    await fetch(baseUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(aluno)
    });
  }

  form.reset();
  document.getElementById('aluno-id').value = '';
  fetchAlunos();
});

cancelarBtn.addEventListener('click', () => {
  form.reset();
  document.getElementById('aluno-id').value = '';
});

window.editar = async id => {
    const res = await fetch(`${baseUrl}/${id}`);
    const aluno = await res.json();
    document.getElementById('aluno-id').value = aluno.id;
    form.nome.value = aluno.nome;
    form.apelido.value = aluno.apelido;
    form.curso.value = aluno.curso;
    form.anoCurricular.value = aluno.anoCurricular;
  };
  
  window.apagar = async id => {
    if (confirm("Tem a certeza que quer apagar?")) {
      await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
      fetchAlunos();
    }
  };
  

fetchAlunos();
