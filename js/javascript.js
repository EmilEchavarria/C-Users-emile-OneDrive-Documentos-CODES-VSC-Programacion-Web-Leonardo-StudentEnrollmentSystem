document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inscriptionForm");
  const tableBody = document.querySelector("#inscriptionTable tbody");

  let inscriptions = [];
  let editIndex = -1;

  function validateForm() {
    form.classList.add("was-validated");
    return form.checkValidity();
  }

  function clearForm() {
    form.reset();
    form.classList.remove("was-validated");
    editIndex = -1;
  }

  function renderTable() {
    tableBody.innerHTML = "";
    inscriptions.forEach((item, i) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${item.fullName}</td>
        <td>${item.email}</td>
        <td>${item.phone || '-'}</td>
        <td>${item.career}</td>
        <td>
          <span class="btn-edit" data-index="${i}" title="Editar">&#9998;</span>
          <span class="btn-delete" data-index="${i}" title="Eliminar">&#10060;</span>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Evento submit del formulario — ✅ único, con todo integrado
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(form);
    const inscriptionData = {
      fullName: formData.get("fullName").trim(),
      email: formData.get("email").trim(),
      phone: formData.get("phone").trim(),
      career: formData.get("career"),
    };

    if (editIndex >= 0) {
      inscriptions[editIndex] = inscriptionData;
      editIndex = -1;
    } else {
      inscriptions.push(inscriptionData);
    }

    renderTable();
    clearForm();

    // ✅ Guardar en localStorage para la otra página
    localStorage.setItem("nombreUsuario", inscriptionData.fullName);
    localStorage.setItem("carreraUsuario", inscriptionData.career);
    localStorage.setItem("carreraSeleccionada", inscriptionData.career); // opcional extra

    // ✅ Redirigir
    window.location.href = "selection/selection.html";
  });

  // Evento click para editar o eliminar en la tabla
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-edit")) {
      const index = parseInt(e.target.dataset.index);
      editIndex = index;

      const data = inscriptions[index];

      // Llenar el formulario para editar
      form.fullName.value = data.fullName;
      form.email.value = data.email;
      form.phone.value = data.phone;
      form.career.value = data.career;

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (e.target.classList.contains("btn-delete")) {
      const index = parseInt(e.target.dataset.index);
      if (confirm("¿Seguro que deseas eliminar esta inscripción?")) {
        inscriptions.splice(index, 1);
        renderTable();
      }
    }
  });

  // Evento reset
  form.addEventListener("reset", () => {
    editIndex = -1;
    form.classList.remove("was-validated");
  });
});
