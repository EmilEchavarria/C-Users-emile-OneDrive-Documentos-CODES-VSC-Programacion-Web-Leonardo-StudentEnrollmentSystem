document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const nombreUsuario = document.getElementById('nombreUsuario');
  const carreraUsuario = document.getElementById('carreraUsuario');
  const materiasContainer = document.getElementById('materiasContainer');

  if (nombreUsuario && carreraUsuario) {
    nombreUsuario.textContent = formData.fullName || 'Nombre no disponible';
    carreraUsuario.textContent = formData.career || 'Carrera no disponible';
  }

  const materiasPorCarrera = {
    "Desarrollo de Software": [
      "Programación III", "Base de Datos I", "Estructura de Datos", "Ingeniería de Software", "Programación Web"
    ],
    "Ciber Seguridad": [
      "Fundamentos de Seguridad", "Criptografía", "Ética Hacker", "Seguridad en Redes", "Análisis Forense Digital"
    ],
    "Multimedia": [
      "Diseño Gráfico", "Animación Digital", "Edición de Video", "Diseño 3D", "Diseño Web"
    ],
    "Seguridad Informatica": [
      "Seguridad de Sistemas Operativos", "Auditoría de Sistemas", "Gestión de Incidentes", "Pentesting", "Hacking Ético"
    ],
    "Inteligencia Artificial": [
      "Introducción a la IA", "Machine Learning", "Redes Neuronales", "Procesamiento de Lenguaje Natural", "Visión por Computadora"
    ]
  };

  // Horarios (mañana, tarde y noche)
  const horarios = [
    "8:00 a.m. – 10:30 a.m.",
    "10:30 a.m.– 1:00 p.m.",
    "1:00 p.m. – 2:00 p.m.",
    "2:00 p.m. – 3:00 p.m.",
    "3:00 p.m. – 6:00 p.m.",
    "6:00 p.m. – 7:00 p.m.",
    "7:00 p.m. – 9:00 p.m.",
    "9:00 p.m. – 10:00 p.m.",
  ];

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  // Función para seleccionar entre 1 y 3 días aleatorios por materia
  function diasAleatorios() {
    const cantidadDias = Math.floor(Math.random() * 3) + 1; // entre 1 y 3
    const diasSeleccionados = [];
    while (diasSeleccionados.length < cantidadDias) {
      const diaRandom = dias[Math.floor(Math.random() * dias.length)];
      if (!diasSeleccionados.includes(diaRandom)) {
        diasSeleccionados.push(diaRandom);
      }
    }
    return diasSeleccionados;
  }

  // Crear listado dinámico con materias, días y horarios con radios,
  // pero todos los radios de la materia comparten mismo "name" para que solo uno se pueda elegir
  const crearMateriasConHorarios = (materias) => {
    materiasContainer.innerHTML = '';

    materias.forEach((materia, index) => {
      const materiaId = `materia${index}`;
      const col = document.createElement('div');
      col.className = 'col-12';

      const card = document.createElement('div');
      card.className = 'card border-0 shadow-sm mb-3 rounded-4';

      const cardHeader = document.createElement('div');
      cardHeader.className = 'card-header bg-primary text-white fw-bold rounded-top-4';
      cardHeader.textContent = materia;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      // Obtener días aleatorios asignados a la materia
      const diasAsignados = diasAleatorios();

      diasAsignados.forEach(dia => {
        const diaTitulo = document.createElement('h6');
        diaTitulo.textContent = dia;
        diaTitulo.className = 'text-secondary mt-3 mb-2';
        cardBody.appendChild(diaTitulo);

        horarios.forEach((hora, hIndex) => {
          const div = document.createElement('div');
          div.className = 'form-check form-check-inline';

          const input = document.createElement('input');
          input.className = 'form-check-input';
          input.type = 'radio';

          // ¡Aquí está el cambio fundamental!:
          // El name es el mismo para toda la materia, no cambia por día
          input.name = `materia_${index}`;

          input.id = `${materiaId}_${dia}_${hIndex}`;
          input.value = `${materia}||${dia}||${hora}`;
          input.setAttribute('data-materia', materia);
          input.setAttribute('data-dia', dia);
          input.setAttribute('data-horario', hora);

          const label = document.createElement('label');
          label.className = 'form-check-label';
          label.htmlFor = input.id;
          label.textContent = hora;

          div.appendChild(input);
          div.appendChild(label);
          cardBody.appendChild(div);
        });
      });

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      col.appendChild(card);
      materiasContainer.appendChild(col);
    });
  };

  if (formData.career && materiasPorCarrera[formData.career]) {
    crearMateriasConHorarios(materiasPorCarrera[formData.career]);
  }

  // Validación y submit del formulario
  const formMaterias = document.getElementById('formMaterias');
  if (formMaterias) {
    formMaterias.addEventListener('submit', (e) => {
      e.preventDefault();

      const seleccionados = [];
      const materias = materiasPorCarrera[formData.career] || [];

      for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];

        // Solo buscamos el seleccionado del grupo único de la materia
        const seleccionado = formMaterias.querySelector(`input[name="materia_${i}"]:checked`);

        if (!seleccionado) {
          Swal.fire({
            icon: 'warning',
            title: 'Faltan horarios',
            text: `Por favor selecciona un horario para la materia "${materia}".`,
            confirmButtonColor: '#0d6efd'
          });
          return;
        } else {
          const [mat, d, hora] = seleccionado.value.split('||');
          seleccionados.push({ materia: mat, dia: d, horario: hora });
        }
      }

      localStorage.setItem('horariosSeleccionados', JSON.stringify(seleccionados));
      window.location.href = '/confirmation/confirmation.html';
    });
  }

  // Formulario de ayuda con SweetAlert
  const formAyuda = document.getElementById('formAyuda');
  if (formAyuda) {
    formAyuda.addEventListener('submit', function (e) {
      e.preventDefault();

      Swal.fire({
        title: 'Enviando...',
        text: 'Estamos procesando tu mensaje',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const datos = new FormData(formAyuda);

      fetch(formAyuda.action, {
        method: 'POST',
        body: datos,
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          Swal.close();
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: '¡Enviado!',
              text: 'Tu mensaje fue enviado exitosamente.',
              confirmButtonColor: '#0d6efd'
            });
            formAyuda.reset();
          } else {
            throw new Error('Error en el envío');
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al enviar. Intenta de nuevo.',
            confirmButtonColor: '#dc3545'
          });
        });
    });
  }
});
