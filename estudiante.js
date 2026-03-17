const API = 'http://localhost:3000/api';
const usuario = localStorage.getItem("usuarioLogeado");

async function cargarNotas() {
  const res = await fetch(`${API}/notas/estudiante/${usuario}`);
  const notas = await res.json();

  const tabla = document.getElementById("tablaNotas");
  tabla.innerHTML = "";

  let suma = 0, aprobadas = 0;

  notas.forEach(n => {
    const aprobado = n.nota >= 3;
    if (aprobado) aprobadas++;
    suma += n.nota;

    tabla.innerHTML += `
      <tr>
        <td>${n.materia}</td>
        <td>${n.nota}</td>
        <td class="${aprobado ? 'ok' : 'bad'}">${aprobado ? 'Aprobado' : 'Reprobado'}</td>
      </tr>
    `;
  });

  const promedio = notas.length > 0 ? (suma / notas.length).toFixed(2) : 0;
  document.getElementById("promedio").innerText = promedio;
  document.getElementById("materias").innerText = notas.length;
  document.getElementById("aprobadas").innerText = aprobadas;
}

cargarNotas();
