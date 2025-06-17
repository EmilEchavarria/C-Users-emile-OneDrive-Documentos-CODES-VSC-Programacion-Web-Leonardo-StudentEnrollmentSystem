// Diccionario de materias por carrera
const materiasPorCarrera = {
  "Desarrollo de Software": [
    "Programación I",
    "Estructura de Datos",
    "Base de Datos I",
    "Arquitectura de Computadoras"
  ],
  "Ciber Seguridad": [
    "Seguridad de Redes",
    "Criptografía",
    "Ética Hacker",
    "Gestión de Incidentes"
  ],
  "Multimedia": [
    "Diseño Gráfico",
    "Edición de Video",
    "Diseño Web",
    "Animación Digital"
  ],
  "Seguridad Informatica": [
    "Auditoría Informática",
    "Legislación Tecnológica",
    "Seguridad en Sistemas Operativos",
    "Hacking Ético"
  ],
  "Inteligencia Artificial": [
    "Fundamentos de IA",
    "Aprendizaje Automático",
    "Visión por Computadora",
    "Procesamiento de Lenguaje Natural"
  ]
};

// Obtener carrera seleccionada desde localStorage
const carrera = localStorage.getItem('carreraSeleccionada');
const container = document.getElementById('materiasContainer');
const boton = document.getElementById('btnInscribirMaterias');

if (carrera && materiasPorCarrera[carrera]) {
  // Construir checkboxes para materias
  const checkboxes = materiasPorCarrera[carrera].map((materia, index) => `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="materia${index}" value="${materia}">
      <label class="form-check-label" for="materia${index}">${materia}</label>
    </div>
  `).join('');

  container.innerHTML = `
    <h4 class="mb-3">Materias para: <span class="text-primary">${carrera}</span></h4>
    <form id="formMaterias">${checkboxes}</form>
  `;
} else {
  container.innerHTML = `<div class="alert alert-warning">No se encontró la carrera seleccionada o está vacía.</div>`;
  if (boton) boton.style.display = 'none';
}

boton?.addEventListener('click', () => {
  const seleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);

  if (seleccionadas.length === 0) {
    alert("Por favor selecciona al menos una materia.");
    return;
  }

  alert("Materias inscritas:\n\n" + seleccionadas.join('\n'));

  // Guardar selección en localStorage (por si quieres usarla luego)
  localStorage.setItem('materiasSeleccionadas', JSON.stringify(seleccionadas));
});



document.addEventListener('DOMContentLoaded', () => {
  const nombre = localStorage.getItem('nombreUsuario') || 'No disponible';
  const carrera = localStorage.getItem('carreraUsuario') || 'No disponible';

  document.getElementById('nombreUsuario').textContent = nombre;
  document.getElementById('carreraUsuario').textContent = carrera;
});
