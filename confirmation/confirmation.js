document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const horariosSeleccionados = JSON.parse(localStorage.getItem('horariosSeleccionados') || '[]');

  // Campos para mostrar datos personales
  const nombreUsuario = document.getElementById('nombreUsuario');
  const emailUsuario = document.getElementById('emailUsuario');
  const telefonoUsuario = document.getElementById('telefonoUsuario');
  const direccionUsuario = document.getElementById('direccionUsuario');
  const fechaNacimientoUsuario = document.getElementById('fechaNacimientoUsuario');
  const carreraUsuario = document.getElementById('carreraUsuario');

  // Mostrar datos personales con valores por defecto si no hay datos
  if (nombreUsuario) nombreUsuario.textContent = formData.fullName || 'Nombre no disponible';
  if (emailUsuario) emailUsuario.textContent = formData.email || 'Correo no disponible';
  if (telefonoUsuario) telefonoUsuario.textContent = formData.phone || 'Teléfono no disponible';

  // Dirección: compuesta de provincia, sector y calle (o usa formData.address si ya tienes guardado así)
  let direccionCompleta = '';
  if (formData.province || formData.sector || formData.street) {
    direccionCompleta = 
      (formData.province || '') +
      (formData.province && formData.sector ? ', ' : '') +
      (formData.sector || '') +
      ((formData.sector || formData.province) && formData.street ? ', ' : '') +
      (formData.street || '');
  }
  if (direccionUsuario) direccionUsuario.textContent = direccionCompleta || 'Dirección no disponible';

  // Fecha de nacimiento (ajusta el nombre si usas otro campo)
  if (fechaNacimientoUsuario) fechaNacimientoUsuario.textContent = formData.birthDate || 'Fecha no disponible';

  if (carreraUsuario) carreraUsuario.textContent = formData.career || 'Carrera no disponible';

  // Tabla de horarios con sábado incluido
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const tbody = document.querySelector('#tablaHorarios tbody');
  if (!tbody) return;

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

  const materiasUnicas = [...new Set(horariosSeleccionados.map(item => item.materia))];

  materiasUnicas.forEach(materia => {
    const tr = document.createElement('tr');

    const tdMateria = document.createElement('td');
    tdMateria.textContent = materia;
    tdMateria.className = 'fw-bold align-middle';
    tr.appendChild(tdMateria);

    dias.forEach(dia => {
      const td = document.createElement('td');
      const horarioObj = horariosSeleccionados.find(item => item.materia === materia && item.dia === dia);
      td.textContent = horarioObj ? horarioObj.horario : '';
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Código existente para cargar datos y horarios...

  const btnConfirmar = document.getElementById('btnConfirmar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
      Swal.fire({
        title: '¡Inscripción confirmada!',
        text: 'Muchas gracias por tu registro.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#198754' // color verde Bootstrap
      });
    });
  }
});
