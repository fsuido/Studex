const API = 'http://localhost:3000/api';

async function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    if (data.ok) {
      localStorage.setItem("usuarioLogeado", data.usuario);
      localStorage.setItem("rolLogeado", data.rol);

      if (data.rol === 'admin') window.location.href = 'admin.html';
      else if (data.rol === 'profesor') window.location.href = 'profesor.html';
      else if (data.rol === 'estudiante') window.location.href = 'estudiante.html';
    } else {
      alert(data.mensaje);
    }
  } catch (err) {
    alert('No se pudo conectar al servidor. ¿Está corriendo el backend?');
  }
}
