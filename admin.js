// const API = 'http://localhost:3000/api';
const API = 'https://studex-backend-vgk5.onrender.com/api';
async function cargarUsuarios() {
  const res = await fetch(`${API}/usuarios`);
  const usuarios = await res.json();

  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";

  let estudiantes = 0, profesores = 0;

  usuarios.forEach(u => {
    if (u.rol === 'estudiante') estudiantes++;
    if (u.rol === 'profesor') profesores++;

    tabla.innerHTML += `
      <tr>
        <td>${u.usuario}</td>
        <td>${u.rol}</td>
        <td>
          <button class="btn-edit" onclick="editarUsuario('${u._id}', '${u.usuario}', '${u.rol}')">Editar</button>
          <button class="btn-delete" onclick="eliminarUsuario('${u._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalUsuarios").innerText = usuarios.length;
  document.getElementById("totalProfesores").innerText = profesores;
  document.getElementById("totalEstudiantes").innerText = estudiantes;
}

async function crearUsuario() {
  const usuario = document.getElementById("nuevoUsuario").value;
  const password = document.getElementById("nuevoPassword").value;
  const rol = document.getElementById("rol").value;

  const res = await fetch(`${API}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password, rol })
  });

  const data = await res.json();
  alert(data.mensaje);

  document.getElementById("nuevoUsuario").value = "";
  document.getElementById("nuevoPassword").value = "";

  cargarUsuarios();
}

async function eliminarUsuario(id) {
  if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

  await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' });
  cargarUsuarios();
}

async function editarUsuario(id, usuarioActual, rolActual) {
  const nuevoNombre = prompt("Nuevo nombre:", usuarioActual);
  const nuevoRol = prompt("Nuevo rol (estudiante / profesor / admin):", rolActual);

  if (nuevoNombre && nuevoRol) {
    await fetch(`${API}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: nuevoNombre, rol: nuevoRol })
    });

    alert("Usuario actualizado");
    cargarUsuarios();
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

cargarUsuarios();
