document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');

  const nombreUsuario = document.getElementById('nombreUsuario');
  const carreraUsuario = document.getElementById('carreraUsuario');
  if (nombreUsuario) nombreUsuario.textContent = formData.fullName || 'Nombre no disponible';
  if (carreraUsuario) carreraUsuario.textContent = formData.career || 'Carrera no disponible';

  const horariosSeleccionados = JSON.parse(localStorage.getItem('horariosSeleccionados') || '[]');

  // Incluye el sábado
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const tbody = document.querySelector('#tablaHorarios tbody');
  tbody.innerHTML = '';

  if (horariosSeleccionados.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = dias.length + 1;
    td.className = 'text-center text-muted';
    td.textContent = 'No se han seleccionado materias.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  // Obtener listado único de materias
  const materiasUnicas = [...new Set(horariosSeleccionados.map(item => item.materia))];

  materiasUnicas.forEach(materia => {
    const tr = document.createElement('tr');

    // Primera columna: nombre de la materia
    const tdMateria = document.createElement('td');
    tdMateria.textContent = materia;
    tdMateria.className = 'fw-bold align-middle';
    tr.appendChild(tdMateria);

    // Columnas por día con horario (si existe)
    dias.forEach(dia => {
      const td = document.createElement('td');
      // Buscar horario que coincida con materia y día
      const horarioObj = horariosSeleccionados.find(item => item.materia === materia && item.dia === dia);
      td.textContent = horarioObj ? horarioObj.horario : '';
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');

  const nombreUsuario = document.getElementById('nombreUsuario');
  const emailUsuario = document.getElementById('emailUsuario');
  const telefonoUsuario = document.getElementById('telefonoUsuario');
  const direccionUsuario = document.getElementById('direccionUsuario');
  const fechaNacimientoUsuario = document.getElementById('fechaNacimientoUsuario');
  const carreraUsuario = document.getElementById('carreraUsuario');

  if (nombreUsuario) nombreUsuario.textContent = formData.fullName || 'Nombre no disponible';
  if (emailUsuario) emailUsuario.textContent = formData.email || 'Correo no disponible';
  if (telefonoUsuario) telefonoUsuario.textContent = formData.phone || 'Teléfono no disponible';
  if (direccionUsuario) direccionUsuario.textContent = formData.address || 'Dirección no disponible';
  if (fechaNacimientoUsuario) fechaNacimientoUsuario.textContent = formData.birthDate || 'Fecha no disponible';
  if (carreraUsuario) carreraUsuario.textContent = formData.career || 'Carrera no disponible';

  // ... resto del código para tabla horarios
});
