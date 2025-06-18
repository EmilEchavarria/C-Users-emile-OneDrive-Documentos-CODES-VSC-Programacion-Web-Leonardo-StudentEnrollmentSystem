document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inscriptionForm');
  const btn = document.getElementById('btnContinuar');

  // Rellenar campos si hay datos guardados
  const saved = JSON.parse(localStorage.getItem('formData') || '{}');

const fields = ['fullName', 'province', 'sector', 'street', 'email', 'phone', 'career', 'birthDate'];
  fields.forEach(field => {
    if (saved[field]) {
      const input = document.getElementById(field);
      if (input) input.value = saved[field];
    }
  });

  // Validar y guardar
  btn.addEventListener('click', () => {
    // Forzar validación visual de Bootstrap
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Recolectar datos
    const data = {};
    fields.forEach(field => {
      const input = document.getElementById(field);
      if (input) data[field] = input.value.trim();
    });

    // Guardar en localStorage
    localStorage.setItem('formData', JSON.stringify(data));

    // Redirigir a la siguiente página
    window.location.href = 'selection/selection.html';
  });

  // Limpiar campos al hacer clic en "Limpiar"
  form.addEventListener('reset', () => {
    form.classList.remove('was-validated'); // Eliminar clase de validación
    localStorage.removeItem('formData'); // Limpiar almacenamiento si es necesario
  });
});
