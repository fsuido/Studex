const API = 'http://localhost:3000/api';
let idEditar = null;

function mostrarFormulario() {
  const materia = document.getElementById("materiaSeleccionada").value;
  document.getElementById("formNotas").style.display = materia ? "block" : "none";
}

async function guardarNota(e) {
  e.preventDefault();

  const estudiante = document.getElementById("estudiante").value;
  const nota = parseFloat(document.getElementById("nota").value);
  const materia = document.getElementById("materiaSeleccionada").value;

  if (nota < 0 || nota > 5) {
    alert("La nota debe estar entre 0 y 5");
    return;
  }

  if (idEditar) {
    await fetch(`${API}/notas/${idEditar}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estudiante, nota, materia })
    });
    idEditar = null;
  } else {
    await fetch(`${API}/notas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estudiante, nota, materia })
    });
  }

  document.getElementById("estudiante").value = "";
  document.getElementById("nota").value = "";
  cargarNotas();
}

async function cargarNotas() {
  const res = await fetch(`${API}/notas`);
  const notas = await res.json();

  const tabla = document.getElementById("tablaNotas");
  tabla.innerHTML = "";

  notas.forEach(n => {
    tabla.innerHTML += `
      <tr>
        <td>${n.estudiante}</td>
        <td>${n.materia}</td>
        <td>${n.nota}</td>
        <td>
          <button class="editar" onclick="editarNota('${n._id}', '${n.estudiante}', ${n.nota}, '${n.materia}')">Editar</button>
          <button class="eliminar" onclick="eliminarNota('${n._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

async function eliminarNota(id) {
  await fetch(`${API}/notas/${id}`, { method: 'DELETE' });
  cargarNotas();
}

function editarNota(id, estudiante, nota, materia) {
  document.getElementById("estudiante").value = estudiante;
  document.getElementById("nota").value = nota;
  document.getElementById("materiaSeleccionada").value = materia;
  mostrarFormulario();
  idEditar = id;
}

cargarNotas();
