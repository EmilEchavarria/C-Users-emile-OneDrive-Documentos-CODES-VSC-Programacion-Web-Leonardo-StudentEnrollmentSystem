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
    "Fundamentos de Programación",
    "Lógica Computacional",
    "Introducción a las Bases de Datos",
    "Diseño de Interfaces",
    "Algoritmos y Pensamiento Computacional",
    "Metodologías Ágiles",
    "Programación Web",
    "Introducción a Git y Control de Versiones"
  ],
  "Redes de Información": [
    "Fundamentos de Redes",
    "Topologías de Red",
    "Dispositivos de Comunicación",
    "Introducción a Cableado Estructurado",
    "Protocolos de Comunicación Básicos",
    "Conceptos de IP y Subredes",
    "Redes LAN y WAN",
    "Configuración Inicial de Routers"
  ],
  "Seguridad Informática": [
    "Fundamentos de Seguridad Informática",
    "Gestión de Contraseñas",
    "Buenas Prácticas en Ciberseguridad",
    "Tipos de Amenazas Digitales",
    "Seguridad en Correo Electrónico",
    "Navegación Segura en Internet",
    "Introducción a Antivirus y Firewalls",
    "Seguridad Física y Digital"
  ],
  "Multimedia": [
    "Introducción al Diseño Gráfico",
    "Fundamentos de Animación Digital",
    "Edición Básica de Imágenes",
    "Producción de Contenido Multimedia",
    "Uso de Software de Edición (Canva, Photoshop básico)",
    "Narrativa Visual",
    "Fotografía Digital Inicial",
    "Creación de Contenido para Redes"
  ],
  "Mecatrónica": [
    "Fundamentos de Electrónica",
    "Mecánica Básica",
    "Principios de Automatización",
    "Introducción a Sensores y Actuadores",
    "Sistemas Eléctricos Simples",
    "Lectura de Planos Mecánicos",
    "Control Manual de Procesos",
    "Herramientas de Taller"
  ],
  "Inteligencia Artificial": [
    "Fundamentos de Inteligencia Artificial",
    "Pensamiento Computacional",
    "Ética en IA",
    "Modelos Simples de IA",
    "Introducción a Datos y Variables",
    "Conceptos de Automatización Inteligente",
    "IA en la Vida Cotidiana",
    "Herramientas Visuales de IA (Teóricas)"
  ],
  "Analítica de Datos": [
    "Fundamentos de Análisis de Datos",
    "Introducción a Microsoft Excel",
    "Representación Gráfica de Datos",
    "Limpieza de Datos Básica",
    "Estadística Descriptiva",
    "Toma de Decisiones con Datos",
    "Uso de Google Sheets",
    "Visualización con Gráficos Simples"
  ],
  "Manufactura Automatizada": [
    "Procesos Industriales Básicos",
    "Herramientas de Manufactura",
    "Seguridad Industrial",
    "Dibujo Técnico",
    "Materiales de Producción",
    "Interpretación de Planos",
    "Fundamentos de Producción",
    "Mantenimiento Preventivo"
  ],
  "Sonido": [
    "Introducción al Sonido",
    "Captura de Audio",
    "Edición de Audio Básica",
    "Formatos de Sonido Digital",
    "Uso de Micrófonos",
    "Ambientes Sonoros",
    "Grabación Casera",
    "Uso de Audacity y Apps Similares"
  ],
  "Desarrollo de Videojuegos": [
    "Introducción al Diseño de Videojuegos",
    "Tipos de Videojuegos",
    "Diseño de Personajes Básico",
    "Storytelling para Videojuegos",
    "Fundamentos de Game Art",
    "Introducción a Motores Gráficos (Unity, Godot - teórico)",
    "Diseño de Niveles Manual",
    "Interfaces de Usuario en Juegos"
  ],
  "Energía Renovable": [
    "Fundamentos de Energía Renovable",
    "Tipos de Energías Limpias",
    "Importancia del Medio Ambiente",
    "Ahorro Energético en el Hogar",
    "Conceptos Básicos de Energía Solar",
    "Fuentes Alternativas de Energía",
    "Uso Doméstico de la Energía",
    "Energía y Sostenibilidad"
  ],
  "Simulaciones Interactivas y Realidad Virtual": [
    "Fundamentos de Realidad Virtual",
    "Historia de la Realidad Aumentada",
    "Diseño de Experiencias Inmersivas",
    "Herramientas Básicas de Simulación",
    "Aplicaciones en Salud, Educación y Juegos",
    "Conceptos Visuales 3D",
    "Exploración de Entornos Virtuales",
    "Introducción a Realidad Aumentada Móvil"
  ],
  "Arquitectura": [
    "Introducción al Diseño Arquitectónico",
    "Dibujo Arquitectónico Básico",
    "Materiales de Construcción",
    "Teoría del Espacio",
    "Historia de la Arquitectura",
    "Diseño de Maquetas Manuales",
    "Interpretación de Planos",
    "Fundamentos de Urbanismo"
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
